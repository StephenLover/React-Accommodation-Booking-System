from pymongo import MongoClient
import sys
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

## Getting a Collection Transaction
collectionTransaction = db['Transaction']
collectionTransaction.remove()
## read the csv file
filename = 'transaction.csv'
dataTransaction = pd.read_csv(os.sep.join([folderName, filename]))

print ("  Start insert transaction ..." , end=" ")
for i in range(dataTransaction.shape[0]):
    demo = dataTransaction.loc[i]
    demo_dict = demo.to_dict()
    demo_dict['accommodationId'] = ObjectId(demo_dict['accommodationId'])
    demo_dict['traveler'] = ObjectId(demo_dict['traveler'])
    demo_dict['status'] = str(demo_dict['status'])
    demo_dict['createdTime'] = datetime.datetime.strptime(demo_dict['createdTime'], "%Y-%m-%d:%H:%M:%S")
    demo_dict['modifiedTime'] = datetime.datetime.strptime(demo_dict['modifiedTime'], "%Y-%m-%d:%H:%M:%S")
    #print (demo_dict, 'dict')
    collectionTransaction.insert(demo_dict)
print ("   Finish!")


## Getting a Collection Review
collectionReview = db['Review']
collectionReview.remove()
## read the csv file
filename = 'review.csv'
dataReview = pd.read_csv(os.sep.join([folderName, filename]))

print ("  Start insert review ..." , end=" ")
for i in range(dataReview.shape[0]):
    demo = dataReview.loc[i]
    demo_dict = demo.to_dict()
    demo_dict['accommodationId'] = ObjectId(demo_dict['accommodationId'])
    demo_dict['reviewer'] = ObjectId(demo_dict['reviewer'])
    demo_dict['star'] = int(demo_dict['star'])
    demo_dict['createdDate'] = datetime.datetime.strptime(demo_dict['createdDate'], "%Y-%m-%d:%H:%M:%S")
    #print (demo_dict, 'dict')
    collectionReview.insert(demo_dict)
print ("   Finish!")
