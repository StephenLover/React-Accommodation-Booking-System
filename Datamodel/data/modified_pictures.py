#!/usr/bin python
# -*- coding: utf-8 -*-

'''
This module is to insert the accomodation pictures into the propertyInfo.csv file.
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

    path = "image_"
    files = os.listdir(path)
    for file in files:
        os.rename(os.sep.join([path, file]), os.sep.join([path, str(begin)+'.jpg']))
        begin += 1
    #files = [f for f in files if "jpg" in f]
#reorder(305)


def gene_picture(size):
    '''Generate the pictures from the given size.
    input:
        - size, the number of pictures need to generate
    return:
        - a list, contain the size of the pictures.
    '''
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

path = 'csv'
filename = 'propertyInfo.csv'

propertyData = pd.read_csv(os.sep.join([path, filename]))

propertyData['pictures'] = gene_picture(propertyData.shape[0])

propertyData.to_csv(os.sep.join([path, filename]), index=False)
