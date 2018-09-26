from pymongo import MongoClient
import sys
import pandas as pd
import time
import random
import os

## change database name if necessary
databaseName = 'test'
## Connect to MongoDB
print ("  Conneting database: %s" %(databaseName))
client = MongoClient("localhost", 27017)
## Select Database "test"
db = client[databaseName]

userId_list = list()
dict_owner_accomId = dict() ## 1-to-many(list)
accomId_list = list()

## Getting a Collection users
collectionUsers = db['User']
relation_userId_email = collectionUsers.find({}, {"_id":1})
for rela in relation_userId_email:
    ## insert userId_list
    userId_list.append( str(rela['_id']) )
#print ("userId_list has %d." % len(userId_list))

## Getting a Collection users
collectionUsers = db['Accommodation']
relation_accomId_owner = collectionUsers.find({}, {"_id":1, "owner":1})
for rela in relation_accomId_owner:
    ## insert dict_owner_accomId
    if str(rela['owner']) in dict_owner_accomId:
        dict_owner_accomId[str(rela['owner'])].append( str(rela['_id']) )
    else:
        dict_owner_accomId[str(rela['owner'])] = [str(rela['_id'])]
    ## insert accomId_list
    accomId_list.append( str(rela['_id']) )
#print ("dict_owner_accomId has %d pairs." %len(dict_owner_accomId))


def rand_duration(start, stop):
    '''Given minimum and maximum value of the duration, return a random number in second'''
    convertToSec = 1 * 60 * 60 * 24
    return random.randint(start * convertToSec, stop * convertToSec)

def gene_accom_time(startTime, stopTime, durationMin, durationMax, size):
    begin = [int(i) for i in startTime.split('-')]
    begin.extend([0,0,0,0,0,0])
    end = [int(i) for i in stopTime.split('-')]
    end[-1] += 1
    end.extend([0,0,0,0,0,0])
    begin = time.mktime(tuple(begin))
    end = time.mktime(tuple(end))

    checkinTimeList = list()
    checkoutTimeList = list()
    for _ in range(size):
        T = random.randint(begin, end)
        T_ = T + rand_duration(durationMin, durationMax)
        checkinTimeList.append(time.strftime("%Y-%m-%d", time.localtime( T )))
        checkoutTimeList.append(time.strftime("%Y-%m-%d", time.localtime( T_ )))
    return checkinTimeList, checkoutTimeList

def gene_all_time(checkinTime, checkoutTime):
    begin = [int(i) for i in checkinTime.split('-')]
    begin.extend([0,0,0,0,0,0])
    end = [int(i) for i in checkoutTime.split('-')]
    end.extend([0,0,0,0,0,0])

    ## convert to second
    begin = time.mktime(tuple(begin))
    end = time.mktime(tuple(end))

    ## add / minus
    transaction_modifiedTime = begin - rand_duration(7, 30) ## trasaction createTime is 7 to 30 days before checkinTime
    transaction_createdTime = transaction_modifiedTime - rand_duration(0.5, 2) ## trasaction modifiedTime is 0.5 to 2 days before checkinTime
    review_createdTime = end + rand_duration(1, 5) ## review createTime is 1 to 5 days after checkoutTime

    ## conver to string
    transaction_modifiedTime = time.strftime("%Y-%m-%d:%H:%M:%S", time.localtime(transaction_modifiedTime))
    transaction_createdTime = time.strftime("%Y-%m-%d:%H:%M:%S", time.localtime(transaction_createdTime))
    review_createdTime = time.strftime("%Y-%m-%d:%H:%M:%S", time.localtime(review_createdTime))

    return transaction_modifiedTime, transaction_createdTime, review_createdTime

def gene_transaction_and_review(size=10, accomBeginTime="2018-04-01", accomEndTime="2018-05-01"):
    '''
    userId_list = list()
    dict_owner_accomId = dict() ## 1-to-many(list)
    accomId_list = list()
    '''
    ## generate accomadation times with the given size
    checkinTime, checkoutTime = gene_accom_time(accomBeginTime, accomEndTime, 3, 7, size)
    ## sorted time
    livingTime = sorted([[checkinTime[i], checkoutTime[i]] for i in range(size)])

    ## initialize table
    transaction_table = list()
    review_table = list()

    user_record = dict() # record current user: endTime
    accomadation_record = dict() # record current accom: endTime
    for i in range(size):
        checkinTime, checkoutTime = livingTime[i][0], livingTime[i][1]
        #print (checkinTime, checkoutTime)
        ## check unavaliableUser and unavaliableAccom
        unavaliableUser = [key for key, value in user_record.items() if value > checkinTime]
        unavaliableAccom = [key for key, value in accomadation_record.items() if value > checkinTime]

        ## get the candidateUser and candidateAccom, choose one from each list
        candidateUser = [userid for userid in userId_list if userid not in unavaliableUser]
        user = random.choice(candidateUser)
        candidateAccom = [accomid for accomid in accomId_list if accomid not in unavaliableAccom and accomid not in dict_owner_accomId[user]]
        accom = random.choice(candidateAccom)

        ## save to record
        user_record[user] = checkoutTime
        accomadation_record[accom] = checkoutTime

        ## generate the times in transaction and review
        tra_modifiedTime, tra_createdTime, rev_createdTime = gene_all_time(checkinTime, checkoutTime)
        ## generate star
        star = random.randint(0, 5)
        #star.append(random.randint(0, 5))

        ## transaction Table
        transaction_table.append([tra_createdTime, tra_modifiedTime, accom, user])
        ## review Table
        review_table.append([rev_createdTime, accom, user, star])

    return sorted(transaction_table), sorted(review_table)

def save_to_file(data):
    for k, v in data.items():
        print('    ', k, ': Start to save...', end=' ')
        filename = k + '.csv'
        df = pd.DataFrame.from_dict(v)
        df = df[keys[k]]
        to_csv_path = os.sep.join([folderName, filename])
        df.to_csv(to_csv_path, header=True, index=False)
        print('Finish..')

__table = ["trasaction.csv", "review.csv"]
folderName = 'csv'

size = 100
transaction_table, review_table = gene_transaction_and_review(size)

print ('  Start to create the tables ...')

data = dict()
keys = dict()

# transaction_table: [tra_createdTime, tra_modifiedTime, accom, user]
data["transaction"] = \
    {"accommodationId": [temp[2] for temp in transaction_table],
    "traveler": [temp[3] for temp in transaction_table],
    "status": ["success" for _ in range(size)],
    "createdTime": [temp[0] for temp in transaction_table],
    "modifiedTime": [temp[1] for temp in transaction_table],
    }
keys['transaction'] = \
    ["accommodationId",
    "traveler",
    "status",
    "createdTime",
    "modifiedTime"]

save_to_file(data)
data.clear()
keys.clear()

# review_table: [rev_createdTime, accom, user, star]
data["review"] = \
    {"accommodationId": [temp[1] for temp in review_table],
    "reviewer": [temp[2] for temp in review_table],
    "star": [temp[3] for temp in review_table],
    "createdDate": [temp[0] for temp in review_table],
    }
keys['review'] = \
    ["accommodationId",
    "reviewer",
    "star",
    "createdDate"]

save_to_file(data)
data.clear()
keys.clear()
