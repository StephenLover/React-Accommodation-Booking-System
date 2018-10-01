from pymongo import MongoClient
#import sys
import json
import pandas as pd
import numpy as np
#from bson.objectid import ObjectId
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

## Getting a Collection User
collectionUser = db['User']
## read the csv file
filename = 'userInfo.csv'
dataUserInfo = pd.read_csv(os.sep.join([folderName, filename]))
dataJson = json.loads(dataUserInfo.to_json(orient='records'))
collectionUser.remove()
print ("  Start insert userInfo ..." , end=" ")
collectionUser.insert(dataJson)
print ("   Finish!")


## Getting a Collection Property
collectionProperty = db['Property']
collectionProperty.remove()
## read the csv file
filename = 'propertyInfo.csv'
dataAccomInfo = pd.read_csv(os.sep.join([folderName, filename]))
## convert the FK ownerId to its corresponding address
#dataAccomInfo['owner'] = dataAccomInfo['owner'].map(lambda x: str(collectionUsers.find({"email":x})[0]['_id']))
print ("  Start insert propertyInfo ..." , end=" ")
for i in range(dataAccomInfo.shape[0]):
    demo = dataAccomInfo.loc[i]
    demo_dict = demo.to_dict()

    demo_dict['_id'] = int(demo_dict['_id'])
    #demo_dict['owner'] = str(demo_dict['owner'])
    #demo_dict['address'] = str(demo_dict['address'])
    #demo_dict['suburb'] = str(demo_dict['suburb'])
    demo_dict['postcode'] = int(demo_dict['postcode'])
    demo_dict['capacity'] = int(demo_dict['capacity'])
    demo_dict['pictures'] = demo_dict['pictures'].split(";")
    demo_dict['longitude'] = float(demo_dict['longitude'])
    demo_dict['latitude'] = float(demo_dict['latitude'])

    #print (demo_dict, 'dict')
    collectionProperty.insert(demo_dict)
print ("   Finish!")

## Getting a Collection Accommodation
collectionAccommodation = db['Accommodation']
collectionAccommodation.remove()
## read the csv file
filename = 'accommodationInfo.csv'
dataAccomInfo = pd.read_csv(os.sep.join([folderName, filename]))
## convert the FK ownerId to its corresponding address
#dataAccomInfo['owner'] = dataAccomInfo['owner'].map(lambda x: str(collectionUsers.find({"email":x})[0]['_id']))
print ("  Start insert accommodationInfo ..." , end=" ")
for i in range(dataAccomInfo.shape[0]):
    demo = dataAccomInfo.loc[i]
    demo_dict = demo.to_dict()

    demo_dict['_id'] = int(demo_dict['_id'])
    demo_dict['property'] = int(demo_dict['property'])
    demo_dict['startDate'] = datetime.datetime.strptime(demo_dict['startDate'], "%Y-%m-%d")
    demo_dict['endDate'] = datetime.datetime.strptime(demo_dict['endDate'], "%Y-%m-%d")
    demo_dict['price'] = int(demo_dict['price'])
    #demo_dict['status'] = str(demo_dict['status'])

    #print (demo_dict, 'dict')
    collectionAccommodation.insert(demo_dict)
print ("   Finish!")

## Getting a Collection Transaction
collectionTransaction = db['Transaction']
collectionTransaction.remove()
## read the csv file
filename = 'transactionInfo.csv'
dataAccomInfo = pd.read_csv(os.sep.join([folderName, filename]))
## convert the FK ownerId to its corresponding address
#dataAccomInfo['owner'] = dataAccomInfo['owner'].map(lambda x: str(collectionUsers.find({"email":x})[0]['_id']))
print ("  Start insert transactionInfo ..." , end=" ")
for i in range(dataAccomInfo.shape[0]):
    demo = dataAccomInfo.loc[i]
    demo_dict = demo.to_dict()

    demo_dict['accommodationId'] = int(demo_dict['accommodationId'])
    #demo_dict['traveler'] = str(demo_dict['traveler'])
    #demo_dict['status'] = str(demo_dict['tatus'])
    demo_dict['createdTime'] = datetime.datetime.strptime(demo_dict['createdTime'], "%Y-%m-%d:%H:%M:%S")
    #demo_dict['endTime'] = datetime.datetime.strptime(demo_dict['endTime'], "%Y-%m-%d:%H:%M:%S")
    if demo_dict['modifiedTime'] != "None":
        demo_dict['modifiedTime'] = datetime.datetime.strptime(demo_dict['modifiedTime'], "%Y-%m-%d:%H:%M:%S")
    else:
        demo_dict['modifiedTime'] = None
    if demo_dict['review'] != "None":
        demo_dict['review'] = str(demo_dict['review'])
    else:
        demo_dict['review'] = None
    if not demo_dict['star']:
        demo_dict['star'] = int(demo_dict['star'])
    else:
        demo_dict['star'] = None
    if demo_dict['reviewDate'] != "None":
        demo_dict['reviewDate'] = datetime.datetime.strptime(demo_dict['reviewDate'], "%Y-%m-%d:%H:%M:%S")
    else:
        demo_dict['reviewDate'] = None

    #print (demo_dict, 'dict')
    collectionTransaction.insert(demo_dict)
print ("   Finish!")
