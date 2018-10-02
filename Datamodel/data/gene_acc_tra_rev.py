
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
genderSet = ['male', 'female']

def gene_password(numberOfRecord):
    passwordList = []
    for i in range(numberOfRecord):
        lenOfPassword = random.randint(8, 16)
        password = "".join(random.choices(selectionSet, k=lenOfPassword))
        passwordList.append(password)
    return passwordList ## can be duplicated

def gene_first_name(size):
    first_name = pd.read_csv(os.sep.join([readFolderName, 'first_name.csv']))
    first_name = first_name['firstname'].tolist()
    return random.choices(first_name, k=size) ## can be duplicated

def gene_last_name(size):
    last_name = pd.read_csv(os.sep.join([readFolderName, 'last_name.csv']))
    last_name = last_name['lastname'].tolist()
    return random.choices(last_name, k=size) ## can be duplicated

def gene_phone_number(size):
    phoneNumberList = []
    for i in range(size):
        phoneNumber = "".join(random.choices(string.digits, k=8))
        phoneNumber = "04" + phoneNumber
        phoneNumberList.append(phoneNumber)
    return phoneNumberList

def gene_gender(size):
    return [random.choice(genderSet) for _ in range(size)]

    begin = [int(i) for i in startTime.split('-')]
    begin.extend([0,0,0,0,0,0])
    end = [int(i) for i in stopTime.split('-')]
    end[-1] += 1
    end.extend([0,0,0,0,0,0])
    begin = time.mktime(tuple(begin))
    end = time.mktime(tuple(end))

    birthdayList = random.choices(range(begin, end), k=size)
    birthdayList = [time.strftime("%Y-%m-%d", time.localtime( birthday )) for birthday in birthdayList]

    return birthdayList

def gene_number(begin, end, size):
    return random.choices(range(begin, end + 1), k=size)

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
        k = random.randint(3,5)
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

## read user_email
print ('  Start to read the user_email.txt ...')

user_email = list()
with open(os.sep.join([readFolderName, 'user_email.txt']), 'r') as f:
    for s in f.readlines():
        user_email.append(s[:-1])


user_email[-1] = "root@gmail.com"
size = len(user_email)
password = gene_password(size)
password[-1] = 'root'

## create tables
print ('  Start to create the tables ...')

data = dict()
keys = dict()

data["userInfo"] = \
    {"_id": user_email,
    "password": password,
    "firstName":gene_first_name(size),
    "lastName": gene_last_name(size),
    "gender": gene_gender(size),
    "phone": gene_phone_number(size),
    }
keys['userInfo'] = \
    ["_id",
    "password",
    "firstName",
    "lastName",
    "gender",
    "phone"]

save_to_file(data)
data.clear()
keys.clear()


propertySize = 280
addressList, surburbList, postcodeList, latitudeList, longitudeList = get_address_info(propertySize)
#propertyNameList = [add.split()[1] + " Apartment" for add in addressList]
ownerList = random.choices(user_email, k=propertySize)
ownerList[0] = 'root@gmail.com'
ownerList[-1] = 'root@gmail.com'
data["propertyInfo"] = \
    {'_id': [i for i in range(propertySize)],
    'owner': ownerList,
    'address': addressList,
    'suburb': surburbList,
    'postcode': postcodeList,
    'capacity': gene_number(begin=2, end=8, size=propertySize),
    'pictures': gene_picture(size=propertySize),
    'longitude':longitudeList,
    'latitude': latitudeList
    }
keys["propertyInfo"] = \
    ['_id',
    'owner',
    'address',
    'suburb',
    'postcode',
    'capacity',
    'pictures',
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
    '''
