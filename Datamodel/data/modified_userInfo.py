#!/usr/bin python
# -*- coding: utf-8 -*-

'''
This module is to insert the profile photo into the userInfo.csv file.
'''

import pandas as pd
import os
import random

#os.rename("image_/20.jpg", "image_/a0.jpg")

def reorder(begin):
    '''
    Reorder and rename the files in the specific folder
    '''
    picturesList = list()

    path = "photo"
    files = os.listdir(path)
    #print (len(files))
    for file in files:
        os.rename(os.sep.join([path, file]), os.sep.join([path, str(begin)+'.jpg']))
        begin += 1
    #files = [f for f in files if "jpg" in f]
#reorder(0)

def gene_picture(size):
    '''Generate the pictures from the given size.
    input:
        - size, the number of pictures need to generate
    return:
        - a list, contain the size of the pictures.
    '''
    picturesList = list()

    folderName = "photo"
    files = os.listdir(folderName)
    files = [f for f in files if "jpg" in f]
    #print (files)
    #print (len(files))
    #files = [f for f in files if "jpg" in f]

    #picturesList = random.sample(files, size)
    picturesList = [os.sep.join([folderName, jpgName]) for jpgName in random.sample(files, size)]

    return picturesList

path = 'csv'
filename = 'userInfo.csv'

userInfoData = pd.read_csv(os.sep.join([path, filename]))

userInfoData['avatar'] = gene_picture(userInfoData.shape[0])
#print (userInfoData.head())

userInfoData.to_csv(os.sep.join([path, filename]), index=False)
