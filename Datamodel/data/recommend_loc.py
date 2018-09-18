
import json
import requests

from pymongo import MongoClient
import pandas as pd
import numpy as np
from bson.objectid import ObjectId
from math import radians, cos, sin, asin, sqrt
from bs4 import BeautifulSoup

class DB:
    def __init__(self, ip="localhost", port=27017, dbName=None):
        self.ip = ip
        self.port = port
        self.client = MongoClient(self.ip, self.port)
        self.db = self.client[dbName]

    def get_db(self):
        return self.db

def get_info_on_ip():
    """
    return suburb(string), region(string), lat(float), lng(float)

    data like the following:
    {
      "ip": "129.94.8.169",
      "hostname": "uniwide-pat-pool-129-94-8-169.gw.unsw.edu.au",
      "city": "Kingsford",
      "region": "New South Wales",
      "country": "AU",
      "loc": "-33.9240,151.2270",
      "org": "AS23859 University of New South Wales"
    }
    """
    url = "http://ipinfo.io/json"
    response = requests.get(url).text
    data = json.loads(response)

    ip = data['ip']
    suburb = data['city']
    region = data['region']

    loc = data['loc'].split(",")
    lat, lng = float(loc[0]), float(loc[1])
    return suburb, region, lat, lng

def dis_2_point(lng1, lat1, lng2, lat2, unit="m"): # 经度1，纬度1，经度2，纬度2 （十进制度数）
    """
    Calculate the great circle distance between two points on the earth (specified in decimal degrees)

    Function details on wiki: https://en.wikipedia.org/wiki/Haversine_formula
    """
    # 将十进制度数转化为弧度
    lng1, lat1, lng2, lat2 = map(radians, [lng1, lat1, lng2, lat2])

    # haversine公式
    dlng = lng2 - lng1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371 # 地球平均半径，单位为公里
    if unit == 'km':
        return c * r
    elif unit == 'm':
        return c * r * 1000

def dis_2_point_dataframe(lng1, lat1, lng2, lat2, unit="m"): # 经度1，纬度1，经度2，纬度2 （十进制度数）
    """
    Calculate the great circle distance between two points on the earth (specified in decimal degrees)

    Function details on wiki: https://en.wikipedia.org/wiki/Haversine_formula
    """
    # 将十进制度数转化为弧度
    lng1, lat1= np.radians(lng1), np.radians(lat1)
    lng2, lat2 = map(radians, [lng2, lat2])
    # haversine公式
    dlng = lng2 - lng1
    dlat = lat2 - lat1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * cos(lat2) * np.sin(dlng/2)**2
    c = 2 * np.arcsin(np.sqrt(a))
    r = 6371 # 地球平均半径，单位为公里
    if unit == 'km':
        return c * r
    elif unit == 'm':
        return c * r * 1000

db = DB(dbName="test").get_db()
## Getting a Collection accommodations
collectionAccommodations = db['Accommodation']
## call get_info_on_ip fucntion, get the current location info
currentSuburb, currentRegion, currentLat, currentLng = get_info_on_ip()
print ("surburb: %s, region: %s, latitude: %f, longitude:%f" %(currentSuburb, currentRegion, currentLat, currentLng))
#currentSuburb="Yarrunga"

accommodationsData = collectionAccommodations.find({})
temp_accommodationsData = pd.DataFrame(list(accommodationsData))
print (temp_accommodationsData.head())

## calculate and insert the distance into dataframe given lng and lat
temp_accommodationsData['dis'] = dis_2_point_dataframe(temp_accommodationsData['longitude'], temp_accommodationsData['latitude'], currentLng, currentLat, unit="m")
temp_accommodationsData = temp_accommodationsData.sort_values(['dis'])
print (temp_accommodationsData.head())
#print (accommodationsData)

if temp_accommodationsData.shape[0] > 100:
    temp_accommodationsData[:100].to_json("temp_recommand_loc.json", orient='records', lines=True, default_handler=str)
else:
    temp_accommodationsData.to_json("temp_recommand_loc.json", orient='records', lines=True, default_handler=str)


''' Test code for dis_2_point_dataframe
data = {"id":[1,2,3,4,5,6,7,8,9,10],
        "lat":[11,12,13,14,15,16,17,18,19,20],
        "lng":[13,15,16,12,11,24,35,67,75,45]}

data = pd.DataFrame(data)
print (data)

#print (np.radians(data['lng']))


data['dis_km'] = dis_2_point_dataframe(data['lng'], data['lat'], 15, 15, unit="km")
print (data.sort_values("dis_km"))
print (data.sort_values("dis_km").index.tolist())
'''
