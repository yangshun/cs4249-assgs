# import CSV
# Headers: participant_id, technique, granularity, open_windows, trial_time,accuracy
ANOVA_3x2x3 <- read.csv("/Users/YangShun/Developer/cs4249-assgs/a1/results-processed/acp-expt-results.csv")

# aggregates values by Participant, Technique, ListType and Distances
# Important: in case some cells are empty, the values will be discarded.
ANOVA_ex2 <- aggregate(list(ANOVA_3x2x3$trial_time), by=list(ANOVA_3x2x3$participant_id, ANOVA_3x2x3$technique, ANOVA_3x2x3$granularity, ANOVA_3x2x3$open_windows), FUN=mean, na.rm=TRUE)

# Renames column header in the aggregated dataset
colnames(ANOVA_ex2) = c("Participant", "Technique", "Granularity", "OpenWindows", "Time")

# Since "OpenWindows" is a number, tells R to consider "OpenWindows" as a factor instead of a number
ANOVA_ex2$OpenWindows <- as.factor(ANOVA_ex2$OpenWindows)

# Runs the ANOVA for Time on Technique x Granularity x OpenWindows, with Participant as a grouping factor
ezANOVA(ANOVA_ex2, dv=Time, wid=Participant, within=c(Technique, Granularity))

# pairwise.t.test(ANOVA_ex2$Time, ANOVA_ex2$Technique, p.adjust="bonf", paired=TRUE)
# pairwise.t.test(ANOVA_ex2$Time, ANOVA_ex2$Granularity, p.adjust="bonf", paired=TRUE)
# pairwise.t.test(ANOVA_ex2$Time, ANOVA_ex2$OpenWindows, p.adjust="bonf", paired=TRUE)

# Compare two techniques: T-test
# Compare 