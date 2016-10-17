# coding=utf-8
__author__ = "Bharat"

import pandas as pd
import csv
import re
import matplotlib.pyplot as plt
from matplotlib.pyplot import pie, axis, show

def buildTrainingData():
    data_raw = pd.read_csv('Full_Data.csv', header=0)

    labeled_data = pd.read_csv('labeled_data.csv', header=0)


    data_dict = {}
    with open('Full_Data.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data_dict[row['Vid']] = row['Description']

    final_labeled_data = []
    with open('labeled_data.csv') as csvfile2:
        reader = csv.DictReader(csvfile2)
        for row in reader:
            dat = row['Hack ID\tHuman/other'].split('\t')
            item = re.sub(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', '', data_dict[dat[0]])
            final_labeled_data.append({'Description': item, 'Label': dat[1].upper()})


    print "Writing File"
    with open('second_hundred.csv', 'wb') as f:
        w = csv.DictWriter(f, fieldnames=['Description', 'Label'])
        w.writeheader()
        for row in final_labeled_data:
            w.writerow(row)


def organizeResult():
    oth = 0
    hum = 0
    with open('Classifier_results2.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['Classification'] == 'HUMAN':
                hum += 1
            else:
                oth += 1

    print oth, " ", hum
    sums = list()
    sums.append(oth)
    sums.append(hum)

    axis('equal');
    pie(sums, labels=['OTHER: '+str(sums[0]), 'HUMAN: '+str(sums[1])]);
    show()

if __name__ == "__main__":
    organizeResult()
    #buildTrainingData()