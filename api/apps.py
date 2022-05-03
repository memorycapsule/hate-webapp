from turtle import update
from django.apps import AppConfig
import dill as pickle
import numpy as np
from csv import writer
import csv   
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import model_selection, naive_bayes, svm
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import cross_val_score
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.model_selection import GridSearchCV
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import numpy as np
from numpy import mean
from numpy import std
import nltk
nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
import re
import tweepy
from threading import Thread
from time import sleep

#Loading the stored models.
vect = pickle.load(open('tfidf_vect.pickle', 'rb'))


#Tweepy for twitter tweets
auth = tweepy.AppAuthHandler("ndExwcX8ZcVBgkSdjn2CV4ux6","w8QvJU9fN6JNVHcDavIfTnum0IDWFQqaItSVJpo8B7S7x6Xwm4")
api = tweepy.API(auth)
client = tweepy.Client(bearer_token='AAAAAAAAAAAAAAAAAAAAANpaaQEAAAAA8viZHr2nWikQJh7L3NaY%2F4FQIQ0%3D3G38HYgSAHB44S7iPbquAWJr39e4rL8ARp2OcaNhVdExIfjd1M')

#Functions call specific models depending on the request.
def runSVC(textData):
    svc = pickle.load(open('lsvc.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = svc.predict(X1)
    return result[0].astype(int)

def runLR(textData):
    lr = pickle.load(open('lr.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = lr.predict(X1)
    return result[0].astype(int)

def runRF(textData):
    rf = pickle.load(open('rf.pkl', 'rb'))
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = rf.predict(X1)
    return result[0].astype(int)

def runNB(textData):
    nb = pickle.load(open('nb.pkl', 'rb'))
    npData = np.array([textData])
    #sparse matrix for NB
    X1 = vect.transform(npData).toarray()
    result = nb.predict(X1)
    return result[0].astype(int)


# def runMLP(textData):
#     # npData = np.array([textData])
#     # X1 = vect.transform(npData)
#     # result = SVC.predict(X1)
#     # return result[0].astype(int)
#     pass
# def runSGD(textData):
#     # npData = np.array([textData])
#     # X1 = vect.transform(npData)
#     # result = SVC.predict(X1)
#     # return result[0].astype(int)
#     pass
class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

def stemtweet(tweet):
  ps = PorterStemmer()
  tokens = word_tokenize(tweet)
  stemmed = []
  for token in tokens:
    stemmed_word = ps.stem(token)
    stemmed.append(stemmed_word)
  return stemmed

def updateModels():
    twitter = pd.read_csv('labeled_data.csv', header=0)
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
    X_train_tfidf, X_test_tfidf, y_train, y_test = train_test_split(X.toarray(), y, random_state=42, test_size=0.2)
    NBOptimzed = GaussianNB(var_smoothing= 0.0002848035868435802) 
    NBOptimzed.fit(X_train_tfidf,y_train)
    pickle.dump(linearOptimized, open('lsvc.pkl', 'wb'))
    pickle.dump(NBOptimzed, open('nb.pkl', 'wb'))
    pickle.dump(rfOptimized, open('rf.pkl', 'wb'))
    pickle.dump(regressionOptimized, open('lr.pkl', 'wb'))
    pickle.dump(transf, open('tfidf_vect.pickle', 'wb'))

"""
It opens the csv file, appends a new row to it, and then calls the updateModels() function

:param word: the word that was labeled
:param type: 0 for negative, 1 for positive
"""
def updateCSV(word, type):
    with open(r'labeled_data.csv', 'a+',newline='') as f:
        fields=[0,3,3,0,0,0, word]
        writer = csv.writer(f)
        writer.writerow(fields)
    updateModels()

"""
The function takes a dataframe as input, and returns a dataframe with the predictions for each tweet

:param df: The dataframe that contains the tweets and hashtags
:return: A dataframe with the predicted sentiment of each tweet.
"""
def predictTrends(df):

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

def getTweets():
    available_loc = api.get_place_trends(44418) # Greater London
    data = available_loc[0]
    trends = data['trends']
    trending =[]
    i=0
    for trend in trends:
        if i > 2:
            break
        trendName = trend['name']
        trending.append(trendName)
        i+=1
    tweet_data = []
    hashtags = []
    for i in range(len(trending)):
        for tweet in tweepy.Cursor(api.search_tweets,q=trending[i],count=1, tweet_mode='extended', lang='en').items(150):
            tweet_data.append(tweet.full_text)
            hashtags.append(trending[i])
    hashtagdf = pd.DataFrame(hashtags, columns=['hashtag'])
    tweetdf = pd.DataFrame(tweet_data, columns=['tweets'])
    df = pd.concat([tweetdf, hashtagdf], axis=1)
    df2 = predictTrends(df)

# def myTimer(seconds):
#     sleep(seconds)
#     getTweets()

# myThread = Thread(target=myTimer, args=(4,))
# myThread.start()