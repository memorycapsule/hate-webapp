from django.apps import AppConfig

#scikit-learn
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.neural_network import MLPClassifier
import pandas as pd
import numpy as np
#NLTK
import nltk
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
#Other
import re
import tweepy
import json
import dill as pickle
import numpy as np
from csv import writer
import csv   
#Loading the stored models.
vect = pickle.load(open('tfidf_vect.pickle', 'rb'))

#Functions call specific models depending on the request.
"""
run Linear SVC
"""
def runSVC(textData):
    svc = pickle.load(open('lsvc.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = svc.predict(X1)
    return result[0].astype(int)
"""
run Logistic Regression
"""
def runLR(textData):
    lr = pickle.load(open('lr.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = lr.predict(X1)
    return result[0].astype(int)
"""
run Random Forest
"""
def runRF(textData):
    rf = pickle.load(open('rf.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = rf.predict(X1)
    return result[0].astype(int)
"""
run Naive Bayes
"""
def runNB(textData):
    nb = pickle.load(open('nb.pkl', 'rb'))
    npData = np.array([textData])
    #sparse matrix for NB
    X1 = vect.transform(npData).toarray()
    result = nb.predict(X1)
    return result[0].astype(int)

"""
run MLP Classifier
"""
def runMLP(textData):
    mlp = pickle.load(open('mlp.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = mlp.predict(X1)
    return result[0].astype(int)
"""
run SGD Classifier
"""
def runSGD(textData):
    sgd = pickle.load(open('sgd.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = sgd.predict(X1)
    return result[0].astype(int)

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

"""
Stems tweets
"""
def stemtweet(tweet):
  ps = PorterStemmer()
  tokens = word_tokenize(tweet)
  stemmed = []
  for token in tokens:
    stemmed_word = ps.stem(token)
    stemmed.append(stemmed_word)
  return stemmed

"""
Updates all models when the CSV file is updated. Uses TFIDF Vectorization and then trains the models. Models are stored in files to be used.
"""
def updateModels():
    twitter = preprocess()
    tfidf_vectorizer = TfidfVectorizer(ngram_range=(1, 2),stop_words='english',use_idf=True,smooth_idf=False,norm=None,decode_error='replace',max_features=10000,min_df=5,max_df=0.75)
    transf = tfidf_vectorizer.fit(twitter['tweet'])
    X = transf.transform(twitter['tweet'])
    y = twitter['class'].astype(int)
    X_train_tfidf, X_test_tfidf, y_train, y_test = train_test_split(X, y, random_state=42, test_size=0.2)
    linearOptimized = LinearSVC(C=0.001,random_state=42)
    linearOptimized.fit(X_train_tfidf,y_train)
    regressionOptimized = LogisticRegression(C=0.01,random_state=42)
    regressionOptimized.fit(X_train_tfidf,y_train)
    rfOptimized = RandomForestClassifier(bootstrap=False,criterion='gini',max_depth=100,max_features='sqrt',n_estimators=100)
    rfOptimized.fit(X_train_tfidf, y_train)
    MLP = MLPClassifier(random_state=42).fit(X_train_tfidf, y_train)
    SGD = SGDClassifier(random_state=42).fit(X_train_tfidf, y_train)
    X_train_tfidf, X_test_tfidf, y_train, y_test = train_test_split(X.toarray(), y, random_state=42, test_size=0.2)
    NBOptimzed = GaussianNB(var_smoothing= 0.0002848035868435802) 
    NBOptimzed.fit(X_train_tfidf,y_train)
    pickle.dump(linearOptimized, open('lsvc.pkl', 'wb'))
    pickle.dump(NBOptimzed, open('nb.pkl', 'wb'))
    pickle.dump(rfOptimized, open('rf.pkl', 'wb'))
    pickle.dump(regressionOptimized, open('lr.pkl', 'wb'))
    pickle.dump(SGD, open('mlp.pkl', 'wb'))
    pickle.dump(MLP, open('sgd.pkl', 'wb'))
    pickle.dump(transf, open('tfidf_vect.pickle', 'wb'))

""" preprocesses the data for models to be trained on """
def preprocess():
    twitter = pd.read_csv('labeled_data.csv', header=0)
    twitter['tweet'] = [entry.lower() for entry in twitter['tweet']]
    pattern = re.compile('\W+')
    twitter['tweet'] = twitter['tweet'].str.replace(pattern," ")
    twitter['tweet'] = twitter['tweet'].str.replace("rt"," ")
    twitter['tweet'] = twitter['tweet'].str.replace("amp"," ")
    twitter['tweet'] = twitter['tweet'].str.replace(re.compile(r'\b\d+(?:\.\d+)?\s+'),"")
    twitter['tweet'] = twitter['tweet'].str.strip('0123456789.- ')
    twitter['tweet'] = twitter['tweet'].str.strip('.-0123456789 ')
    nltk.download('stopwords')
    stopwords = nltk.corpus.stopwords.words("english")
    twitter['tweet'] = twitter['tweet'].replace('stopwords','')
    return twitter

"""
Opens the csv file, appends a new row to it, and then calls the updateModels() function
"""
def updateCSV(word):
    with open(r'labeled_data.csv', 'a+',newline='') as f:
        fields=[0,3,3,0,0,0, word]
        writer = csv.writer(f)
        writer.writerow(fields)
    updateModels()
"""
The function takes a dataframe as input, and returns a dataframe with the predictions for each trend
"""
def predictTrends(df):
  svc = pickle.load(open('lsvc.pkl', 'rb'))
  df2 = pd.DataFrame()
  preds = []
  for i in range(df['tweets'].shape[0]):
    np_df = pd.DataFrame(df['tweets'].iloc[[i]])
    np_df = np.array(np_df)
    X1= vect.transform(np_df[0][:]).toarray()
    y_pred = svc.predict(X1)
    df2 = df2.append({'Prediction': y_pred, 'Tweet': df['tweets'].iloc[i], 'Hashtag': df['hashtag'].iloc[i]}, ignore_index=True)
    preds.append(y_pred)
  df2['Prediction'] = df2['Prediction'].explode().astype(int)
  return df2

"""
The function takes a dataframe as input, and returns a dataframe with the predictions for each tweet
"""
def predict(df):
    svc = pickle.load(open('lsvc.pkl', 'rb'))
    df2 = pd.DataFrame()
    preds = []
    for i in range(df['tweets'].shape[0]):
        np_df = pd.DataFrame(df['tweets'].iloc[[i]])
        np_df = np.array(np_df)
        X1= vect.transform(np_df[0][:]).toarray()
        y_pred = svc.predict(X1)
        df2 = df2.append({'Index': i,'Prediction': y_pred, 'Tweet': df['tweets'].iloc[i]}, ignore_index=True)
        preds.append(y_pred)
    df2['Prediction'] = df2['Prediction'].explode().astype(int)
    df2['Index'] = df2['Index'].explode().astype(int)
    return df2
"""
The function gets tweets from twitters api, grabs the top 3 trending topics, and predicts them with the Linear SVC model.
"""
# tweet_data = []
# for tweet in tweepy.Cursor(api.search_tweets,q='#WillSmith',count=3, tweet_mode='extended', lang='en').items(3):
#     tweet_data.append(tweet.full_text)
# tweetdf = pd.DataFrame(tweet_data, columns=['tweets'])
# df = predict(tweetdf)
def getTweets():
    auth = tweepy.AppAuthHandler("ndExwcX8ZcVBgkSdjn2CV4ux6","w8QvJU9fN6JNVHcDavIfTnum0IDWFQqaItSVJpo8B7S7x6Xwm4")
    api = tweepy.API(auth)
    available_loc = api.get_place_trends(44418) # Greater London
    data = available_loc[0]
    trends = data['trends']
    trending =[]
    i=0

    for trend in trends:
        if i > 3:
            break
        trendName = trend['name']
        trending.append(trendName)
        i+=1

    tweet_data = []
    hashtags = []
    for i in range(len(trending)):
        for tweet in tweepy.Cursor(api.search_tweets,q=trending[i],count=20, tweet_mode='extended', lang='en').items(20):
            tweet_data.append(tweet.full_text)
            hashtags.append(trending[i])

    hashtagdf = pd.DataFrame(hashtags, columns=['hashtag'])
    tweetdf = pd.DataFrame(tweet_data, columns=['tweets'])
    df = pd.concat([tweetdf, hashtagdf], axis=1)
    df2 = predictTrends(df)
    return json.loads(df2.to_json(orient="records"))
