## set working directory
#setwd("~/git/WCO/experiments/1-SONA/analysis/")
setwd("/Users/katherine/Desktop/Maryland/WCO/experiments/1-SONA/analysis")

## load helper file for bootstrapped CIs
source("helpers.r")

## load full data file
df_s = read.csv("sentence_rating_sona-merged-new.csv",header=T)
d_s = subset(df_s, select = c("workerid","WCO","animacy","condition","determiner","item","response","slide_number","trial_type","subject_information.assess","subject_information.gender","subject_information.age","subject_information.language","time_in_minutes"))
d_s$unique_worker = paste("S",d_s$workerid)
df_e = read.csv("sentence_rating_external-merged.csv",header=T)
df_e = df_e[df_e$subject_information.comments!="Greg",] # get rid of Greg data
d_e = subset(df_e, select = c("workerid","WCO","animacy","condition","determiner","item","response","slide_number","trial_type","subject_information.assess","subject_information.gender","subject_information.age","subject_information.language","time_in_minutes"))
d_e$unique_worker = paste("E",d_e$workerid)

df = rbind(d_s,d_e)

head(df)
#write.csv(df,"raw-data-anonymous.csv")
