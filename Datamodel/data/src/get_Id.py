from pymongo import MongoClient
import sys
import json
import pandas as pd
from bson.objectid import ObjectId
import datetime

## change database name if necessary
databaseName = 'test'
dataPath = './csv/'
## Connect to MongoDB
print ("Conneting database: %s" %(databaseName))
client = MongoClient("localhost", 27017)
## Select Database "test"
db = client[databaseName]

## Getting a Collection users
collectionUsers = db['users']
relation_userId_email = collectionUsers.find({}, {"_id":1, "email":1})
for rela in relation_userId_email:
    print (rela)


## Getting a Collection users
collectionUsers = db['accommodations']
relation_accomId_owner = collectionUsers.find({}, {"_id":1, "owner":1})
for rela in relation_accomId_owner:
    print (rela)
