
import random
import string
import pandas as pd
import numpy as np
import time
import urllib
from urllib.request import urlopen
import json
import os

__table = ["userInfo,csv", "accommodationInfo.csv"]
readFolderName = 'csv'
selectionSet = string.ascii_letters + string.digits
genderSet = ['male', 'female', 'None']

def gene_password(numberOfRecord):
    passwordList = []
    for i in range(numberOfRecord):
        lenOfPassword = random.randint(8, 16)
        password = "".join(random.choices(selectionSet, k=lenOfPassword))
        passwordList.append(password)
    return passwordList ## can be duplicated

def gene_first_name(userInfoLen):
    first_name = pd.read_csv(os.sep.join([readFolderName, 'first_name.csv']))
    first_name = first_name['firstname'].tolist()
    return random.choices(first_name, k=userInfoLen) ## can be duplicated

def gene_last_name(userInfoLen):
    last_name = pd.read_csv(os.sep.join([readFolderName, 'last_name.csv']))
    last_name = last_name['lastname'].tolist()
    return random.choices(last_name, k=userInfoLen) ## can be duplicated

def gene_phone_number(userInfoLen):
    phoneNumberList = []
    for i in range(userInfoLen):
        phoneNumber = "".join(random.choices(string.digits, k=8))
        phoneNumber = "04" + phoneNumber
        phoneNumberList.append(phoneNumber)
    return phoneNumberList

def gene_gender(userInfoLen):
    return [random.choice(genderSet) for _ in range(userInfoLen)]

def gene_birthday(userInfoLen):
    days30 = [4,6,9,11]
    days31 = [1,3,5,7,8,10,12]
    def leapYear(year):
        '''Return 1 if the year is leap year; otherwise, return 0'''
        if (year % 4 == 0 and year % 100 != 0 ) or (year % 400 == 0):
            return 1
        else:
            return 0

    def generateBirthday(yearBegin, yearEnd):
        '''Return a random birthday, given begin year and end year'''
        randomYear = random.randint(yearBegin, yearEnd)
        randomMonth = random.randint(1,12)
        if randomMonth == 2:
            if leapYear(randomYear):
                randomDay = random.randint(1,29)
            else:
                randomDay = random.randint(1,28)
        elif randomMonth in days30:
            randomDay = random.randint(1,30)
        elif randomMonth in days31:
            randomDay = random.randint(1,31)
        return str(randomDay) + "/" + str(randomMonth) + "/" + str(randomYear)

    birthdayList = [generateBirthday(2018-130,2018) for _ in range(userInfoLen)]
    return birthdayList

def gene_number(begin, end, size):
    return random.choices(range(begin, end + 1), k=size)

def rand_duration(start, stop, unit):
    '''Given minimum and maximum value of the duration with the unit, return a random number in second'''
    if unit.lower() in ['d', 'day', 'days']:
        convertToSec = 1 * 60 * 60 * 24
        return random.randint(start * convertToSec, stop * convertToSec)
    elif unit.lower() in ['h','hour','hours']:
        convertToSec = 1 * 60 * 60
        return random.randint(start * convertToSec, stop * convertToSec)
    elif unit.lower() in ['min','minute', 'minutes']:
        convertToSec = 1 * 60
        return random.randint(start * convertToSec, stop * convertToSec)
    elif unit.lower() in ['s','sec','second','second']:
        convertToSec = 1
        return random.randint(start * convertToSec, stop * convertToSec)

def gene_time(startTime, stopTime, durationMin, durationMax, unit, size):
    begin = [int(i) for i in startTime.split('-')]
    begin.extend([0,0,0,0,0,0])
    end = [int(i) for i in stopTime.split('-')]
    end[-1] += 1
    end.extend([0,0,0,0,0,0])
    begin = time.mktime(tuple(begin))
    end = time.mktime(tuple(end))

    #fristTimeList = np.array([time.strftime("%Y-%m-%d", time.localtime( random.randint(begin, end) )) for _ in range(size)])
    firstTimeList = list()
    secondTimeList = list()
    for _ in range(size):
        T = random.randint(begin, end)
        T_ = T + rand_duration(durationMin, durationMax, unit)
        firstTimeList.append(time.strftime("%Y-%m-%d", time.localtime( T )))
        secondTimeList.append(time.strftime("%Y-%m-%d", time.localtime( T_ )))
    return firstTimeList, secondTimeList

def get_lat_lng(address):
    addressUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address

    addressUrlQuote = urllib.parse.quote(addressUrl, ':?=/')
    response = urlopen(addressUrlQuote).read().decode('utf-8')
    responseJson = json.loads(response)

    postcode = responseJson.get('results')[0]['address_components'][-1]["short_name"]
    latitude = responseJson.get('results')[0]['geometry']['location']['lat']
    longitude = responseJson.get('results')[0]['geometry']['location']['lng']
    return postcode, latitude, longitude

def get_address_info(size):
    fileName = "street_name_popular.csv"
    data = pd.read_csv(fileName)

    data = data.dropna(axis=0).reset_index()
    selectIndex = np.random.choice(data.shape[0], size, replace=False)
    #print (selectIndex)
    selectData = data.loc[selectIndex].reset_index()

    addressList = list()
    for i in range(selectData.shape[0]):
        street = str(selectData['streetNumber'][i]) + " "+ selectData['streetName'][i]
        addressList.append(street)

    surburbList = selectData['suburbName']
    postcodeList = selectData['postcode']
    latitudeList = selectData['lat']
    longitudeList = selectData['lng']
    return addressList, surburbList, postcodeList, latitudeList, longitudeList

def gene_picture(size):
    picturesList = list()

    folderName = "image"
    files = os.listdir(folderName)
    files = [f for f in files if "jpg" in f]

    for _ in range(size):
        k = random.randint(2,5)
        jpgNames = random.choices(files, k=k)
        path = ";".join([os.sep.join([folderName, jpgName]) for jpgName in jpgNames])
        picturesList.append(path)
    return picturesList

def save_to_file(data):
    for k, v in data.items():
        print('    ', k, ': Start to save...', end=' ')
        filename = k + '.csv'
        df = pd.DataFrame.from_dict(v)
        df = df[keys[k]]
        to_csv_path = os.sep.join([readFolderName, filename])
        df.to_csv(to_csv_path, header=True, index=False)
        print('Finish..')

## read cust_no and cust_name
print ('  Start to read the user_email.txt ...')

user_email = list()
with open(os.sep.join([readFolderName, 'user_email.txt']), 'r') as f:
    for s in f.readlines():
        user_email.append(s[:-1])
userInfoLen = len(user_email)

## create tables
print ('  Start to create the tables ...')

data = dict()
keys = dict()

data["userInfo"] = \
    {"email": user_email,
    "password": gene_password(userInfoLen),
    "firstName":gene_first_name(userInfoLen),
    "lastName": gene_last_name(userInfoLen),
    "gender": gene_gender(userInfoLen),
    "phone": gene_phone_number(userInfoLen),
    }
keys['userInfo'] = \
    ["email",
    "password",
    "firstName",
    "lastName",
    "gender",
    "phone"]

save_to_file(data)
data.clear()
keys.clear()

accommodationInfoLen = 1000
#addressList, surburbList = gene_address(accommodationInfoLen)
#postcodeList, latitudeList, longitudeList = extra_address_info(addressList)
addressList, surburbList, postcodeList, latitudeList, longitudeList = get_address_info(accommodationInfoLen)
startTime, endTime = gene_time(startTime="2018-08-20", stopTime="2019-08-20", \
                            durationMin=1, durationMax=7, unit='d', size=accommodationInfoLen)
data["accommodationInfo"] = \
    {'owner': random.choices(user_email, k=accommodationInfoLen),
    'address': addressList,
    'suburb': surburbList,
    'postcode': postcodeList,
    'capacity': gene_number(begin=1, end=8, size=accommodationInfoLen),
    'startDate': startTime,
    'endDate': endTime,
    'pictures': gene_picture(size=accommodationInfoLen),
    'price': gene_number(begin=250, end=400, size=accommodationInfoLen),
    'longitude':longitudeList,
    'latitude': latitudeList
    }
keys["accommodationInfo"] = \
    ['owner',
    'address',
    'suburb',
    'postcode',
    'capacity',
    'startDate',
    'endDate',
    'pictures',
    'price',
    'longitude',
    'latitude']
save_to_file(data)
data.clear()
keys.clear()

## generate later
'''
data["watchingList"]= \
    {'userId':
    'accommodationId':
    }

data["pendingList"]= \
    {'userId':
    'accommodationId':
    }
    '''
