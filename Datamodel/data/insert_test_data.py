from pymongo import MongoClient
import sys
import json
import pandas as pd
from bson.objectid import ObjectId
import datetime
import os

## change database name if necessary
databaseName = 'test'
folderName = 'csv'
## Connect to MongoDB
print ("  Conneting database: %s" %(databaseName))
client = MongoClient("localhost", 27017)
## Select Database "test"
db = client[databaseName]

## Getting a Collection users
collectionUsers = db['User']
## read the csv file
filename = 'userInfo.csv'
dataUserInfo = pd.read_csv(os.sep.join([folderName, filename]))
dataJson = json.loads(dataUserInfo.to_json(orient='records'))
collectionUsers.remove()
print ("  Start insert userInfo ..." , end=" ")
collectionUsers.insert(dataJson)
print ("   Finish!")

## Getting a Collection accommodations
collectionAccommodations = db['Accommodation']
collectionAccommodations.remove()
## read the csv file
filename = 'accommodationInfo.csv'
dataAccomInfo = pd.read_csv(os.sep.join([folderName, filename]))
## convert the FK ownerId to its corresponding address
dataAccomInfo['owner'] = dataAccomInfo['owner'].map(lambda x: str(collectionUsers.find({"email":x})[0]['_id']))
print ("  Start insert accommodationInfo ..." , end=" ")
for i in range(dataAccomInfo.shape[0]):
    demo = dataAccomInfo.loc[i]
    demo_dict = demo.to_dict()
    demo_dict['owner'] = ObjectId(demo_dict['owner'])
    demo_dict['postcode'] = int(demo_dict['postcode'])
    demo_dict['capacity'] = int(demo_dict['capacity'])
    demo_dict['startDate'] = datetime.datetime.strptime(demo_dict['startDate'], "%Y-%m-%d")
    demo_dict['endDate'] = datetime.datetime.strptime(demo_dict['endDate'], "%Y-%m-%d")
    #demo_dict['pictures'] = ['https://picsum.photos/966/360/?random']
    demo_dict['pictures'] = demo_dict['pictures'].split(";")
    demo_dict['price'] = int(demo_dict['price'])
    demo_dict['longitude'] = float(demo_dict['longitude'])
    demo_dict['latitude'] = float(demo_dict['latitude'])
    #print (demo_dict, 'dict')
    collectionAccommodations.insert(demo_dict)
print ("   Finish!")
