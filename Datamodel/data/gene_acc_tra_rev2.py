
import sys
import pandas as pd
import numpy as np
import time
import random
import os

def gene_number(begin, end, size):
    return random.choices(range(begin, end + 1), k=size)

def rand_duration(start, stop):
    '''Given minimum and maximum value of the duration, return a random number in second'''
    convertToSec = 1 * 60 * 60 * 24
    return random.randint(start * convertToSec, stop * convertToSec)

def gene_time(startTime, stopTime, durationMin, durationMax, size):
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
        T_ = T + rand_duration(durationMin, durationMax)
        firstTimeList.append(time.strftime("%Y-%m-%d", time.localtime( T )))
        secondTimeList.append(time.strftime("%Y-%m-%d", time.localtime( T_ )))
    return firstTimeList, secondTimeList

def time_op(currentTime, durationMin, durationMax, op):
    currentTime = [int(i) for i in currentTime.split('-')]
    currentTime.extend([0,0,0,0,0,0])

    ## convert to second
    currentTime = time.mktime(tuple(currentTime))

    ## add / minus
    if op =='add':
        newTime = currentTime + rand_duration(durationMin, durationMax)
    elif op == "minus":
        newTime = currentTime - rand_duration(durationMin, durationMax) ## trasaction createTime is 7 to 30 days before checkinTime

    ## conver to string
    newTime = time.strftime("%Y-%m-%d:%H:%M:%S", time.localtime(newTime))
    return newTime

def save_to_file(data):
    for k, v in data.items():
        print('    ', k, ': Start to save...', end=' ')
        filename = k + '.csv'
        df = pd.DataFrame.from_dict(v)
        df = df[keys[k]]
        to_csv_path = os.sep.join([folderName, filename])
        df.to_csv(to_csv_path, header=True, index=False)
        print('Finish..')

currentTime = "2018-10-09"
brokenTime = "2018-10-16"

print ('  Start to read the userInfo.csv ...')

## open the userinfo.csv, get the user._id
folderName = 'csv'
userInfoFileName = 'userInfo.csv'

userInfoData = pd.read_csv(os.sep.join([folderName, userInfoFileName]), index_col=False)
userId_list = userInfoData['_id'].tolist()
#print ("userId_list has %d." % len(userId_list))
del userInfoData

print ('  Start to read the propertyInfo.csv ...')
## open the propertyInfo.csv, get the property._id and the dict ( onwer._id: property_id )
folderName = 'csv'
propertyInfoFileName = 'propertyInfo.csv'
# Index(['_id', 'owner', 'propertyName', 'address', 'suburb', 'postcode',
#       'capacity', 'pictures', 'longitude', 'latitude'],
#      dtype='object')
propertyInfoData = pd.read_csv(os.sep.join([folderName, propertyInfoFileName]), index_col=False)
#print (propertyInfoData.columns)
#print ("propertyInfoData has", propertyInfoData.shape)
propertyId_list = propertyInfoData['_id'].tolist()
dict_owner_propertyId = dict()
dict_propertyId_owner = dict()
property_owner_list = propertyInfoData['owner'].tolist()
for i in range(len(propertyId_list)):
    ## insert dict_owner_propertyId
    if str(property_owner_list[i]) in dict_owner_propertyId:
        dict_owner_propertyId[property_owner_list[i]].append( propertyId_list[i] )
    else:
        dict_owner_propertyId[property_owner_list[i]] = [propertyId_list[i]]
    ## insert dict_propertyId_owner
    dict_propertyId_owner[propertyId_list[i]] = property_owner_list[i]


## create tables
print ('  Start to create the tables ...')

## Accommodation Table
accommodationInfoLen = 700

startTime, endTime = gene_time(startTime="2018-07-01", stopTime="2019-01-01", \
                            durationMin=2, durationMax=7, size=accommodationInfoLen)
sortTime = sorted([[startTime[i], endTime[i]] for i in range(accommodationInfoLen)])
startTime = [sortTime[i][0] for i in range(accommodationInfoLen)]
endTime = [sortTime[i][1] for i in range(accommodationInfoLen)]

accomStatusList = list()
for i in range(accommodationInfoLen):
    begin, end = startTime[i], endTime[i]
    if begin > brokenTime:
        accomStatusList.append("open")
    else:
        accomStatusList.append("close")

propertyList = [0] ## make sure "root" in the record
property_record = {0: endTime[0]}
for i in range(1, accommodationInfoLen):
    begin, end = startTime[i], endTime[i]
    # check unavaliable property
    unavaliableProperty = [key for key,value in property_record.items() if value > begin]

    ## get the candidate property,  and choose one from each list
    candidateProperty = [propertyid for propertyid in propertyId_list if propertyid not in unavaliableProperty]
    propertyid = random.choice(candidateProperty)

    property_record[propertyid] = end

    propertyList.append(propertyid)

data = dict()
keys = dict()

data["accommodationInfo"] = \
    {'_id': [i for i in range(accommodationInfoLen)],
    'startDate': startTime,
    'endDate': endTime,
    'price': gene_number(begin=250, end=400, size=accommodationInfoLen),
    'status': accomStatusList,
    'property': propertyList
    }
keys['accommodationInfo'] = \
    ['_id',
    'startDate',
    'endDate',
    'price',
    'status',
    'property']
save_to_file(data)

accommodationData = pd.DataFrame( data["accommodationInfo"] )
#print (accommodationData.columns)
#print (accommodationData.shape)
data.clear()
keys.clear()

## transaction Table
close_accomInfoData = accommodationData[accommodationData.status == 'close']
#print ("closed accommodation has ", close_accomInfoData.shape)
#print (close_accomInfoData.index)
closed_index = close_accomInfoData.index.tolist()

## initial each attri
accomIdList = list()
travelerList = list()
transactionStatusList = list()
transactionCreatedTimeList = list()
transactionModifiedTimeList = list()
starList = list()
reviewDateList = list()

closed_number = close_accomInfoData.shape[0]

review_record = dict()
for i in closed_index:
    accomid, accomStartDate, accomEndDate, accomProperty = \
        close_accomInfoData['_id'][i], close_accomInfoData['startDate'][i], close_accomInfoData['endDate'][i], close_accomInfoData['property'][i]

    ##
    accomIdList.append(i)

    ## check unavaliableReviewer
    unavaliableReviewer = [key for key, value in review_record.items() if value > accomStartDate]
    unavaliableReviewer.append(dict_propertyId_owner[accomProperty])
    ## get the candidateUser and candidateAccom, choose one from each list
    candidateUser = [userid for userid in userId_list if userid not in unavaliableReviewer]
    reviewer = random.choice(candidateUser)
    ## save to record
    review_record[reviewer] = accomEndDate
    travelerList.append(reviewer)

    ##
    if currentTime < accomStartDate and brokenTime < accomEndDate:
        transactionStatusList.append('pending')

        ##
        tempCreatedTime = time_op(currentTime, 0.5, 1.5, op='minus')
        transactionCreatedTimeList.append(tempCreatedTime)
        transactionModifiedTimeList.append('None')
    else:
        transactionStatusList.append('success')

        ##
        tempModifiedTime = time_op(accomStartDate, 5, 30, op='minus')
        tempCreatedTime = time_op(tempModifiedTime.split(":")[0], 0.5, 1.9, op='minus')
        transactionCreatedTimeList.append(tempCreatedTime)
        transactionModifiedTimeList.append(tempModifiedTime)

    ## must has review
    if accomEndDate <= currentTime:
        tempCreatedTime = time_op(accomEndDate, 1, 15, op='add')
        if tempCreatedTime > currentTime:
            tempCreatedTime = time_op(accomEndDate, 0, 0, op='minus')
        starList.append(random.randint(1, 5))
        reviewDateList.append(tempCreatedTime)
    else:
        starList.append(np.nan)
        reviewDateList.append('None')

data["transactionInfo"] = \
    {"accommodationId": accomIdList,
    "traveler": travelerList,
    "status": transactionStatusList,
    "createdTime": transactionCreatedTimeList,
    "modifiedTime": transactionModifiedTimeList,
    "star": starList,
    "reviewDate": reviewDateList
    }
keys['transactionInfo'] = \
    ["accommodationId",
    "traveler",
    "status",
    "createdTime",
    "modifiedTime",
    "star",
    "reviewDate"]
save_to_file(data)
