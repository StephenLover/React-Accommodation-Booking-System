#!/usr/bin python
# -*- coding: utf-8 -*-

'''
This module is to generate the email with teh given size,
and save into the user_email.txt file in csv folder.
'''

import random
import sys
import string
import os

def generate_email(numberOfRecord):
    emailDomain = ['gmail', 'yahoo', '163', 'qq', 'hotmail']
    selectionSet = string.ascii_letters + string.digits

    ## generate email
    emailList = []
    i = 0
    while i < numberOfRecord:
        lenOfEmailHead = random.randint(1, 15) ## includ 1 and 15
        emailHead = "".join(random.choices(selectionSet, k=lenOfEmailHead))
        email = emailHead + "@" + random.choice(emailDomain) + ".com"
        if email not in emailList: ## check duplicate
            i += 1
            emailList.append(email)

    path = 'csv'
    filename = "user_email.txt"
    ## save to file
    with open(os.sep.join([path, filename]), "w") as f:
        f.writelines(email + "\n" for email in emailList)

if __name__ == "__main__":

    numberOfRecord = int(sys.argv[1])
    generate_email(numberOfRecord)
