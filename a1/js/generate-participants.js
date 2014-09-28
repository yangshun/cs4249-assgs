var fs = require('fs');

var data = {
  "data": {}
}

var granularity = {
  '0': ['phrase', 'sentence', 'paragraph'],
  '1': ['sentence', 'paragraph', 'phrase'],
  '2': ['paragraph', 'phrase', 'sentence']
}

var participants = {};

for (var i = 1; i <= 6; i++) {
  var experiments = [];
  for (var j = 0; j < 2; j++) {
    var technique;
    if (i <= 3) {
      technique = (j == 0 ? 'autocompaste' : 'shortcuts');
    } else {
      technique = (j == 0 ? 'shortcuts' : 'autocompaste');
    }
    for (var k = 0; k < 3; k++) {
      var gran = granularity[(i-1)%3][k];
      for (var m = 0; m < 3; m++) {
        var windows = (m+1) * 2;
        var bs = k*9 + m*3;
        var exp = {
          technique: technique,
          granularity: gran,
          windows: windows,
          stimuli: [bs+1, bs+2, bs+3]
        }
        experiments.push(exp);
      }
    }
  }
  participants['P' + i.toString()] = experiments;
}

data.data = participants;

console.log(data);

var outputFilename = 'participants.json';

fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
