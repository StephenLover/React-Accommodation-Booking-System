

import os
import random
import pandas as pd
import math

path = "csv"
filename = "Descriptive Words to Include in Your Real Estate Brochure.txt"

wordsList1 = list() ## total 77 words
with open(os.sep.join([path, filename]), 'r') as f:
    for i in f.readlines():
        if len(i.split()) == 1:
            wordsList1.append(i.strip())



filename = 'Words that describe buildings or rooms and parts of buildings.txt'
wordsList2 = list() ## total 77 words
with open(os.sep.join([path, filename]), 'r') as f:
    for i in f.readlines():
        if 'adjective' in i:
            wordsList2.append(i.split()[0])


reviewList = []

filename = 'transactionInfo.csv'
transactionData = pd.read_csv(os.sep.join([path, filename]))

stars = transactionData['star']
for star in stars:
    word1 = random.choice(wordsList1)
    word2 = random.choice(wordsList2)
    word3 = random.choice(['hosue', 'apartemnt'])

    if not math.isnan(star):
        review = "A {0} and {1} {2}.".format(word1,word2,word3)
        if int(star) < 3:
            review += " However, the poor customer service"

        reviewList.append(review)
    else:
        reviewList.append('None')

transactionData['review'] = reviewList
transactionData.to_csv(os.sep.join([path, filename]),index = False)
