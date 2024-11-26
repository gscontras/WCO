## set working directory
#setwd("~/git/WCO/experiments/1-SONA/analysis/")
setwd("/Users/katherine/Desktop/Maryland/WCO/experiments/1-SONA/analysis")

## load helper file for bootstrapped CIs
source("helpers.r")

## load full data file
df = read.csv("sentence_rating_sona-merged.csv",header=T)
length(unique(df$workerid)) # 15

## filter participants by language
unique(df$subject_information.language)
d = df[df$subject_information.language=="English"|
       df$subject_information.language=="English "|
       df$subject_information.language=="english"|
       df$subject_information.language=="english "
       ,]
length(unique(d$workerid)) # 10

## condition information
#d = d[d$slide_number!="NA",]
#d$NY = NA
#d$NY = matrix(unlist(strsplit(d$condition,"")))[1,1]

# filler check
d$filler_type = NA
d[d$item == "filler1" |
  d$item == "filler2" |
  d$item == "filler3",]$filler_type = "good"
d[d$item == "filler4" |
    d$item == "filler5" |
    d$item == "filler6",]$filler_type = "bad"
d$filler_check = NA

aggregate(response~item*filler_type*workerid,data=d,FUN=mean)

d$filler_correct = 0
d[d$condition=="filler" & d$filler_type=="good" & d$response>=0.50,]$filler_correct = 1
d[d$condition=="filler" & d$filler_type=="bad" & d$response<0.50,]$filler_correct = 1

e = d

for(i in unique(as.factor(e$workerid))) {
  tempsum <- sum(e[e$workerid==i,]$filler_correct)
  if(tempsum<5) {
    e = e[e$workerid != i,]
  }
}

#summary(as.factor(e$workerid))
# remove participants 76, 78, 84, 85, 89, 90, 103, 107, 99

# e = d[d$workerid!="30"&
#         d$workerid!="76"&
#         d$workerid!="78"&
#         d$workerid!="84"&
#         d$workerid!="85"&
#         d$workerid!="89"&
#         d$workerid!="90"&
#         d$workerid!="103"&
#         d$workerid!="107" &
#         d$workerid!="99"
#         ,]


# remove item with typo -> no longer needed, typo fixed
#f = e[e$item!="priest",]

f = matrix(unique(as.factor(e$workerid)), ncol = 1)
f = as.data.frame(f)

colnames(f)[1] <- "workerid"
f$N_avg = 0
f$Y_avg = 0

for (i in unique(as.factor(e$workerid))){
  f[f$workerid == i,]$N_avg = mean(e[e$workerid == i & (e$condition == "NDA" | e$condition == "NDI" | e$condition == "NQA" | e$condition == "NQI"),]$response)
  f[f$workerid == i,]$Y_avg = mean(e[e$workerid == i & (e$condition == "YDA" | e$condition == "YDI" | e$condition == "YQA" | e$condition == "YQI"),]$response)
  }

f$avgDiff = f$N_avg - f$Y_avg

hist(f$avgDiff)

## calculate averages and CIs by condition
length(unique(e$workerid)) # 4
d_s = bootsSummary(data=e, measurevar="response", groupvars=c("condition"))

## plot results
ggplot(data=d_s,aes(x=condition,y=response))+
  geom_bar(stat="identity",fill="lightgray",color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=condition, width=0.25),alpha=1)+
  #facet_grid(.~condition)+
  theme_bw()

#create clean df with only test trials


## fit a linear mixed-effects model
library(lme4)
library(lmerTest)
m = lmer(response~WCO*determiner*animacy+(1|item)+(1|workerid), data=d)
summary(m)

