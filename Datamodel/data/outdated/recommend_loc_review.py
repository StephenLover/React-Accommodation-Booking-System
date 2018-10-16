from pymongo import MongoClient
import pandas as pd
import numpy as np

## connect the database
class DB:
    def __init__(self, ip="localhost", port=27017, dbName=None):
        self.ip = ip
        self.port = port
        self.client = MongoClient(self.ip, self.port)
        self.db = self.client[dbName]

    def get_db(self):
        return self.db

db = DB(dbName="test").get_db()
## getting a collection Accommodation
collectionAccommodations = db['Accommodation']
## gettign a collection Reivew
collectionReview = db['Review']

accommodationsData = collectionAccommodations.find({})
# columns include: ['_id', 'address', 'capacity', 'endDate', 'latitude', 'longitude',
#       'owner', 'pictures', 'postcode', 'price', 'startDate', 'suburb']
temp_accommodationsData = pd.DataFrame(list(accommodationsData))
print (temp_accommodationsData.shape)
#print (temp_accommodationsData.head())
#print (temp_accommodationsData.columns)

reviewData = collectionReview.find({})
# columns include: ['_id', 'accommodationId', 'createdDate', 'reviewer', 'star']
temp_reviewData = pd.DataFrame(list(reviewData))[['accommodationId', 'star']]
#print (temp_reviewData.head())
#print (temp_reviewData.columns)

averageReviewStar = temp_reviewData.groupby(['accommodationId']).agg('mean')
print (averageReviewStar.columns)

mergedData = temp_accommodationsData.join(averageReviewStar)
print (mergedData.shape)
print ((mergedData['star'] == np.nan).sum())
