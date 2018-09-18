import os
import pandas as pd

import random
import string
import numpy as np
import time
#import urllib
#from urllib.request import urlopen
import json
import requests


def get_address(dict):
    streetName = str(dict['streetNumber']) + " " + dict['streetName'] + "," + dict['suburbName'] + ",NSW,AU"
    return streetName

def get_lat_lng(address):
	key = '&key=AIzaSyAV3w1IR223ySaYF11kfp3YgGcZycfZ9Jg'
	addressUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + key
	#addressUrlQuote = urllib.parse.quote(addressUrl, ':?=/')
	#response = urlopen(addressUrlQuote).read().decode('utf-8')
	response = requests.get(addressUrl).text
	responseJson = json.loads(response)
	jsonStatus = responseJson.get('status')
	jsonResults = responseJson.get('results')
	#print (responseJson)
	if jsonStatus == "OK":
		address_components = jsonResults[0]['address_components']
		postcode = np.nan
		for add_com in address_components:
			if add_com['types'][0] == "postal_code":
				postcode = add_com["short_name"]

		geometry = jsonResults[0]['geometry']
		latitude = geometry['location']['lat']
		longitude = geometry['location']['lng']
		return 1, postcode, latitude, longitude
	else:
		return 0,0,0,0

## read the file
Mac = True
if Mac == True:
    dataPath = "./" #'./data/'
    openfilename = 'street_name_popular.csv'
    data = pd.read_csv(dataPath + openfilename)
else:
    openfilename = 'street_name_popular.csv'
    data = pd.read_csv(openfilename)

totalSize = data.shape[0]
statusList = data['status'].tolist()
postcodeList = data['postcode'].tolist()
latList = data['lat'].tolist()
lngList = data['lng'].tolist()

## start update the address info
indexNan = data.index[data['status'].isnull()].tolist()
counter = 0
for index in indexNan:
    address = get_address(data.loc[index])
    status, postcode, lat, lng = get_lat_lng(address)
    if status == 1:
        statusList[index] = status
        postcodeList[index] = postcode
        latList[index] = lat
        lngList[index] = lng
    counter += 1
    if counter % 500 == 0:
        print ("finising %.2f%%" %(counter/totalSize * 100))
    if counter == 2500:
        break
data['status'] = statusList
data['postcode'] = postcodeList
data['lat'] = latList
data['lng'] = lngList

after = data.index[data['status'].isnull()].tolist()
print ("adding lat and lng %d" %(len(indexNan) - len(after)))

data.to_csv(openfilename, index=False)
