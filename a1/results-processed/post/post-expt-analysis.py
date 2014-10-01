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
            'ease_of_use_autocompaste', 
            'ease_of_use_shortcuts',
            'efficiency',
            'use_acp_without_guidance',
            'learned_acp_easily',
            'use_acp_future_work',
            'experiment_difficulties',
            'experiment_effectiveness',
            'experiment_feedback']

csv_data = [headers]
pure_data = []

for i in range(1, 7):
  data = read_json('P' + str(i) + '-post.json')
  row = []
  for header in headers:
    if header in data:
      row.append(data[header])
    else:
      row.append('')
  csv_data.append(row)
  pure_data.append(row)

mean_row = ['Mean']
for col_index in range(1, 7):
  values = [int(row[col_index]) for row in pure_data]
  mean_row.append(round(mean(values), 3))
mean_row.extend(['-'] * 3)
csv_data.append(mean_row)

std_row = ['SD']
for col_index in range(1, 7):
  values = [int(row[col_index]) for row in pure_data]
  std_row.append(round(math.sqrt(mean(variance(values))), 3))
std_row.extend(['-'] * 3)
csv_data.append(std_row)

write_csv('post-expt-questionnaire.csv', csv_data)
