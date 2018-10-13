
import pandas as pd
import os
import math
import random

def find_the_host_name(transactionId = 0):
    '''
    input:
        - transactionId
    return:
        - firstName

    based on the transactionId, find the firstname of house host

    userInfo: firstName, _id
    propertyInfo: _id, owner
    accommodationInfo: _id, property
    transactionInfo: accommodationId
    '''
    select_accommodationInfo = accommodationInfo[accommodationInfo['_id'] == transactionId]
    propertyId = select_accommodationInfo['property'].tolist()[0]
    #print (propertyId)

    select_propertyInfo = propertyInfo[propertyInfo['_id'] == propertyId]
    userId = select_propertyInfo['owner'].tolist()[0]
    #print (userId)

    select_userInfo = userInfo[userInfo['_id'] == userId]

    return select_userInfo['firstName'].tolist()[0]


## read data from the file
path = "csv"

userInfo = pd.read_csv(os.sep.join([path, "userInfo.csv"]))
propertyInfo = pd.read_csv(os.sep.join([path, "propertyInfo.csv"]))
accommodationInfo = pd.read_csv(os.sep.join([path, "accommodationInfo.csv"]))
transactionInfo = pd.read_csv(os.sep.join([path, "transactionInfo.csv"]))

## read the good review modelue
positive_review_sample = list()
with open(os.sep.join([path, "review_positive_module.txt"]), 'r') as f:
    for i in f.readlines():
        positive_review_sample.append(i.strip())

## read the bad review modelue
negative_review_sample = list()
with open(os.sep.join([path, "review_negative_module.txt"]), 'r') as f:
    for i in f.readlines():
        negative_review_sample.append(i.strip())

#print (len(positive_review_sample))
#print (len(negative_review_sample))

old_star = transactionInfo[['accommodationId','star']]

new_star = list()
new_review = list()

#print(transactionInfo[transactionInfo['star'] < 3].shape)
#print(transactionInfo[transactionInfo['star'] >= 3].shape)

#print (old_star)


for _, val in old_star.iterrows():
    index, star = val['accommodationId'], val['star']
    if math.isnan(star):
        new_review.append("None")
    elif star < 3:
        new_review.append(random.choice(negative_review_sample))
    else:
        ## replace (Host name) by firstName
        review = random.choice(positive_review_sample)
        firstName = find_the_host_name(index)
        #print (index, firstName)
        review = review.replace('(Host name)', firstName)
        review = review.replace('(Host Name)', firstName)
        #print (review)
        new_review.append(review)

transactionInfo['review'] = new_review

## save
transactionInfo.to_csv(os.sep.join([path, 'transactionInfo.csv']), index=False)
