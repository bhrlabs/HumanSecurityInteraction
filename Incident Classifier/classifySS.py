# coding=utf-8

import pandas as pd
import re
import csv
import nltk
from textblob.classifiers import DecisionTreeClassifier
from textblob import TextBlob


training_data_raw = pd.read_csv('Training_set.csv', header=0)


# print training_data_raw
training_data_set = {}
for key,  row in training_data_raw.iterrows():
   training_data_set[row[0]] = row[1]



training_data = []

for key, value in training_data_set.iteritems():
   key = re.sub(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', '', key)
   value = value.upper()
   training_data.append((unicode(key, 'utf-8', 'ignore'), value))



classifier = DecisionTreeClassifier(training_data)

# print(classifier.classify(u"Prosthetic and Orthotic Care (POC), an independent prosthetics and orthotics company serving disabled individuals in Southern Illinois and Eastern Missouri, has discovered that an unauthorized individual has stolen the protected health information of 23,015 patients.The cyberattack occurred in June 2016, although POC only became aware of the hacking incident on July 10. The hacker gained access to patient data by exploiting security flaw in a third party software system that had been purchased by POC. The attack was conducted by a hacker operating under the name â€“ TheDarkOverlord â€“ who was also responsible for the cyberattacks on Athens Orthopedic Clinic and Midwest Orthopedics Group, in addition to a hack of as of yet unnamed health insurer. In total, the records of over 9.5 million patients are understood to have been obtained by the hacker.According to a breach notice issued by POC, the stolen data include names, addresses and other contact information, internal ID numbers, billing amounts, appointment dates, and diagnostic codes. Some patients also had their Social Security number, date of birth, procedure photographs, health insurerâ€™s names, and other identification information stolen. The breach total number was included in the posting of the third party software vendor who was hacked and affected many medical clinics, practices and facilities.".encode('ascii', errors='ignore')))
# print(classifier.classify(u"Providence Health & Services in Oregon is notifying about 5,400 current and former patients that a former employee may have improperly accessed their patient records.Providence said in a statement Friday that it learned of the breach in May during an internal audit and had since fired the Portland-based employee.The audit found the worker had accessed health records between July 2012 and April 2016. It says the worker viewed demographic and medical treatment information, and may also have seen insurance information and Social Security numbers.".encode(encoding='ascii', errors='ignore')))

test_data_raw = pd.read_csv('Test_set.csv', header=0)

test_data=[]
test_set=[]
print "Step in 1"
for key, row in test_data_raw.iterrows():
   item = row[0]
   item = unicode(item, 'utf-8', 'ignore')
   item = re.sub(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', '', item)
   classification = classifier.classify(item)
   #test_data.append({'Incident': item,  'Classification' : classification})
   test_set.append((item, classification))
"""
with open('Classifier_results.csv', 'wb') as f:
   w = csv.DictWriter(f, fieldnames=['Incident', 'Classification'])
   w.writeheader()
   for row in test_data:
       w.writerow(row)
"""
print classifier.accuracy(test_set)