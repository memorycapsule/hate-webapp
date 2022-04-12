from django.apps import AppConfig
import pickle
import numpy as np
from sklearn import svm
model = pickle.load(open('C:\\Users\\hasan\\Desktop\\Project\\hate-webapp\\api\model.pkl', 'rb'))
vect = pickle.load(open('C:\\Users\\hasan\\Desktop\\Project\\hate-webapp\\api\\tfdif_vect.pickle', 'rb'))


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

def runModel(textData):
    npData = np.array([textData])
    X1 = vect.transform(npData)
    result = model.predict(X1)
    return result[0].astype(int)
    