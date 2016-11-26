# coding=utf-8
__author__ = "Bharat"

import pandas as pd
import csv
import re
import matplotlib.pyplot as plt
from matplotlib.pyplot import pie, axis, show
import numpy as np

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
    with open('Human_results2.csv') as csvfile:
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

def catagorize():
    res = {}
    resAll = {}
    with open('Human_results2.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            if row['Classification'] == 'HUMAN':
                if row['Entity'] in res:
                    res[row['Entity']] = res[row['Entity']] + 1
                else:
                    res[row['Entity']] = 1
            if row['Entity'] in resAll:
                resAll[row['Entity']] = resAll[row['Entity']] + 1
            else:
                resAll[row['Entity']] = 1
    res.pop('')
    resAll.pop('')
    ax = plt.subplot()
    li1 = np.arange(len(res)) + 0.2
    li2 = np.arange(len(res)) - 0.2

    rrr1 = ax.bar(li1, res.values(), width=0.4, color='b', align='center')
    rrr2 = ax.bar(li2, resAll.values(), width=0.4, color='g', align='center')
    ax.legend([rrr1, rrr2], ["Human", "All"])
    #ax.set_xticklabels( ['']+res.keys())
    ax.set_xticklabels( ['', 'Medi', 'NGO', 'Retail', 'Other', 'Edu', 'Finc', 'Gov'])

    for rect, label in zip(rrr1, res.values()):
        height = rect.get_height()
        ax.text(rect.get_x() + rect.get_width()/2, height + 5, label, ha='center', va='bottom')

    for rect, label in zip(rrr2, resAll.values()):
        height = rect.get_height()
        ax.text(rect.get_x() + rect.get_width()/2, height + 15, label, ha='center', va='bottom')

    plt.show()


if __name__ == "__main__":
    catagorize()
    #organizeResult()
    #buildTrainingData()