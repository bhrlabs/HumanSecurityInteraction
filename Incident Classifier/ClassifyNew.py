# coding=utf-8
__author__ = 'Bharat'


import pandas as pd
import re
import csv
from textblob.classifiers import NaiveBayesClassifier
#NaiveBayesClassifier DecisionTreeClassifier
from textblob import TextBlob

training_data_raw = pd.read_csv('Training_set2.csv', header=0)

print "Pre-processing Training Set"
training_data = []
test_data = []
count = 0
for key, row in training_data_raw.iterrows():
   key = re.sub(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', '', row[0])
   key = key.replace('"','')
   blob = TextBlob(unicode(key, 'utf-8', 'ignore'))
   key = ' '.join(blob.noun_phrases)
   value = row[1].upper()
   if count < 180:
      training_data.append((key, value))
   else:
      test_data.append((key, value))
   count+=1

print "Traing Set is Processed"

print "Learning in progress ..."
classifier = NaiveBayesClassifier(training_data)
print "Classifier Ready"

print classifier.accuracy(test_data)
print(classifier.classify(u"Prosthetic and Orthotic Care (POC), an independent prosthetics and orthotics company serving disabled individuals in Southern Illinois and Eastern Missouri, has discovered that an unauthorized individual has stolen the protected health information of 23,015 patients.The cyberattack occurred in June 2016, although POC only became aware of the hacking incident on July 10. The hacker gained access to patient data by exploiting security flaw in a third party software system that had been purchased by POC. The attack was conducted by a hacker operating under the name â€“ TheDarkOverlord â€“ who was also responsible for the cyberattacks on Athens Orthopedic Clinic and Midwest Orthopedics Group, in addition to a hack of as of yet unnamed health insurer. In total, the records of over 9.5 million patients are understood to have been obtained by the hacker.According to a breach notice issued by POC, the stolen data include names, addresses and other contact information, internal ID numbers, billing amounts, appointment dates, and diagnostic codes. Some patients also had their Social Security number, date of birth, procedure photographs, health insurerâ€™s names, and other identification information stolen. The breach total number was included in the posting of the third party software vendor who was hacked and affected many medical clinics, practices and facilities.".encode('ascii', errors='ignore')))

print "Writing Results to csv"
flag = True
with open('Full_Data.csv') as inp:
    with open('Human_results2.csv', 'wb') as oup:
        reader = csv.reader(inp)
        writer = csv.writer(oup)
        for row in reader:
            if flag:
                row.append("Classification")
                writer.writerow(row)
                flag = False
            else:
                item = row[12]
                item = unicode(item, 'utf-8', 'ignore')
                item = re.sub(r'''(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))''', '', item)
                classification = classifier.classify(item)
                row.append(classification)
                writer.writerow(row)

print "Done ... Enjoy!!"


