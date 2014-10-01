# import CSV
# Headers: participant_id, technique, granularity, open_windows, trial_time, accuracy
raw_data <- read.csv("/Users/YangShun/Developer/cs4249-assgs/a1/results-processed/acp-expt-results.csv")

# aggregates values by Participant, Technique, Granularity and Open Windows
# Important: in case some cells are empty, the values will be discarded.
data <- aggregate(list(raw_data$accuracy), by=list(raw_data$participant_id, raw_data$technique, raw_data$granularity, raw_data$open_windows), FUN=mean, na.rm=TRUE)

# Renames column header in the aggregated raw_dataset
colnames(data) = c("Participant", "Technique", "Granularity", "OpenWindows", "Accuracy")

# Since "OpenWindows" is a number, tells R to consider "OpenWindows" as a factor instead of a number
data$OpenWindows <- as.factor(data$OpenWindows)

# Runs the ANOVA for Accuracy on Technique x Granularity x OpenWindows, with Participant as a grouping factor
ezANOVA(data, dv=Accuracy, wid=Participant, within=c(Technique, Granularity, OpenWindows))

phraseOnly <- subset(data, Granularity=='phrase')
pairwise.t.test(phraseOnly$Accuracy, phraseOnly$Technique, p.adjust="bonf", paired=TRUE)

sentenceOnly <- subset(data, Granularity=='sentence')
pairwise.t.test(sentenceOnly$Accuracy, sentenceOnly$Technique, p.adjust="bonf", paired=TRUE)

paragraphOnly <- subset(data, Granularity=='paragraph')
pairwise.t.test(paragraphOnly$Accuracy, paragraphOnly$Technique, p.adjust="bonf", paired=TRUE)

twoOpenWindows <- subset(data, OpenWindows=='2')
pairwise.t.test(twoOpenWindows$Accuracy, twoOpenWindows$Technique, p.adjust="bonf", paired=TRUE)

fourOpenWindows <- subset(data, OpenWindows=='4')
pairwise.t.test(fourOpenWindows$Accuracy, fourOpenWindows$Technique, p.adjust="bonf", paired=TRUE)

sixOpenWindows <- subset(data, OpenWindows=='6')
pairwise.t.test(sixOpenWindows$Accuracy, sixOpenWindows$Technique, p.adjust="bonf", paired=TRUE)
