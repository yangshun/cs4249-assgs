import csv

def read_csv(csv_filename):
  rows = ()
  with open(csv_filename, 'rU') as csv_file:
    file_reader = csv.reader(csv_file, quotechar='"', delimiter = ',')
    for row in file_reader:
      rows += (tuple(row), )
  return rows

def write_csv(csv_filename, data):
  with open(csv_filename, 'wb') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerows(data)

def mean(values): 
  return sum(values) * 1.0 / len(values)

# Index 0: Participant ID
# Index 1: Technique
# Index 2: Granularity
# Index 3: Open Windows
# Index 4: Trial Time
# Index 5: Accuracy
data = read_csv('acp-expt-results.csv')
data = data[1:] # Discard the header

timing_data = []
timing_data.append(['granularity', 'open_windows', 'shortcut_timing', 'acp_timing', 'difference'])

for granularity in ('phrase', 'sentence', 'paragraph'):
  for open_windows in ('2', '4', '6'):
    filtered_data = [row for row in data if (row[2] == granularity and row[3] == open_windows)]
    shortcut_rows = [int(row[4]) for row in filtered_data if row[1] == 'shortcuts']
    shortcut_timing = round(mean(shortcut_rows), 2)
    acp_rows = [int(row[4]) for row in filtered_data if row[1] == 'autocompaste']
    acp_timing = round(mean(acp_rows), 2)
    timing_data.append([granularity, open_windows, shortcut_timing, acp_timing, round(shortcut_timing-acp_timing, 2)])

write_csv('acp-comparison-timing.csv', timing_data)

accuracy_data = []
accuracy_data.append(['granularity', 'open_windows', 'shortcut_accuracy', 'acp_accuracy', 'difference'])

for granularity in ('phrase', 'sentence', 'paragraph'):
  for open_windows in ('2', '4', '6'):
    filtered_data = [row for row in data if (row[2] == granularity and row[3] == open_windows)]
    shortcut_rows = [int(row[5]) for row in filtered_data if row[1] == 'shortcuts']
    shortcut_accuracy = round(mean(shortcut_rows), 3)
    acp_rows = [int(row[5]) for row in filtered_data if row[1] == 'autocompaste']
    acp_accuracy = round(mean(acp_rows), 3)
    accuracy_data.append([granularity, open_windows, shortcut_accuracy, acp_accuracy, round(shortcut_accuracy-acp_accuracy, 3)])

write_csv('acp-comparison-accuracy.csv', accuracy_data)
