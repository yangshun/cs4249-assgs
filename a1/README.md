CS4249 Assignment 1
==

### Pre-Experiment Questionnaire

The pre-experiment questionnaire can be found on the following page: [http://yangshun.im/cs4249-assgs/a1/#/pre](http://yangshun.im/cs4249-assgs/a1/#/pre).
A consolidated version of the pre-experiment questionnaire results can be found in the `results-processed/pre/pre-expt-questionnaire.csv`.

### Post-Experiment Questionnaire

The post-experiment questionnaire can be found on the following page: [http://yangshun.im/cs4249-assgs/a1/#/post](http://yangshun.im/cs4249-assgs/a1/#/post).
A consolidated version of the post-experiment questionnaire results can be found in the `results-processed/post/post-expt-questionnaire.csv`.

### Condition Arrangement

The condition arrangement is generated from the `generate-participants.js` script inside the `js` folder. To execute it, run
```
$ node generate-participants.js
```

The generated condition arrangement can be found inside `js/participants.json`.

### Experiment Procedure

1. Navigate to the root folder with `index.html` in it, simple serve that file any web server. The simplest command possible:
```
$ python -m SimpleHTTPServer
```
Navigate to [http://locahost:8000](http://localhost:8000) on your browser to view the page.

2. At the landing page, a brief introduction of the experiment is given. There are 6 possible participant IDs: **P1**, **P2**, **P3**, **P4**, **P5** and **P6**. Enter anyone of them in the text field and click the **Start** button.

3. Fill up the Pre-experiment questionnaire with your information and click **Proceed**.

4. The instructions screen is shown next. After reading the instructions, click **Proceed**.

5. The experiment interface will be shown. You are given a trial to try out the AutoComPaste technique and the traditional keyboard shortcuts technique. When you are done with the trial, click on the **Start Experiment** button.

6. Use the described technique (either autocompaste or shortcuts) to copy the text into the textbox. Use the `Shift`+`Enter` shortcut or press the **Next Trial** button on the bottom left corner of the screen when you are done.

7. At any time, you may press the **Generate CSV** button to download the experiment data to check that the data is indeed being logged.

8. After completing the experiment, click on "End Experiment". You will brought to the Post-experiment Questionnaire. Please take some time to fill it up.

9. That's it. Thank you!

Done by: [Tay Yang Shun](https://github.com/yangshun)
