import csv
import json
import math

def read_json(filename):
  datafile = open(filename, 'r')
  return json.loads(datafile.read())

def write_csv(csv_filename, data):
  with open(csv_filename, 'wb') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows(data)

def mean(values): 
  return sum(values) * 1.0 / len(values)

def variance(values):
  mean_value = mean(values)
  return map(lambda value: (value - mean_value)**2, values)

headers = [ 'pid',
            'name', 
            'gender',
            'age',
            'occupation',
            'education_level',
            'hand',
            'medication',
            'alcohol',
            'computer_usage',
            'copy_paste_frequency',
            'shortcuts_familiarity',
            'shortcuts_usage',
            'copy_paste_method',
            'autocompaste_heard',
            'autocompaste_used']

csv_data = [headers]

for i in range(1, 7):
  data = read_json('P' + str(i) + '-pre.json')
  row = []
  for header in headers:
    if header in data:
      row.append(data[header])
    else:
      row.append('')
  csv_data.append(row)

write_csv('pre-expt-questionnaire.csv', csv_data)
