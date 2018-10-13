import pandas as pd
import random
import os

path = "csv"

accommodationInfo = pd.read_csv(os.sep.join([path, 'accommodationInfo.csv']))
print (accommodationInfo.shape)

size = accommodationInfo.shape[0]
print (size)

ch = [0, 15, 25, 50, 100]
ad = [random.choice(ch) for _ in range(size)]
print (ad)

accommodationInfo['ad'] = ad

print (accommodationInfo.shape)

accommodationInfo.to_csv(os.sep.join([path, 'accommodationInfo.csv']), index=False)
