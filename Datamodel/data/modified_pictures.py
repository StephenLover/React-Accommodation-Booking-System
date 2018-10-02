import pandas as pd
import os
import random

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

path = 'csv'
filename = 'propertyInfo.csv'

propertyData = pd.read_csv(os.sep.join([path, filename]))

propertyData['pictures'] = gene_picture(propertyData.shape[0])

propertyData.to_csv(os.sep.join([path, filename]), index=False)
