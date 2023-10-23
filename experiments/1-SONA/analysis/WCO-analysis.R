## set working directory
setwd("~/git/WCO/experiments/1-rating/analysis/")

## load helper file for bootstrapped CIs
source("helpers.r")

## load full data file
df = read.csv("sentence_rating-merged.csv",header=T)
length(unique(df$workerid)) # 27

## filter participants by language
unique(df$subject_information.language)
d = df[df$subject_information.language=="English"|
       df$subject_information.language=="English "|
       df$subject_information.language=="english",]
length(unique(d$workerid)) # 18

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
# remove participants 30, 31*, 34, 45, 49*, 50, 51, 54*, 56, 62*, 66
e = d[d$workerid!="30"&
        #d$workerid!="31"&
        d$workerid!="34"&
        d$workerid!="45"&
        #d$workerid!="49"&
        d$workerid!="50"&
        d$workerid!="51"&
        #d$workerid!="54"&
        d$workerid!="56"&
        #d$workerid!="62"&
        d$workerid!="66"
        ,]

# remove item with typo
f = e[e$item!="priest",]


## calculate averages and CIs by condition
length(unique(f$workerid)) # 7
d_s = bootsSummary(data=f, measurevar="response", groupvars=c("condition"))

## plot results
ggplot(data=d_s,aes(x=condition,y=response))+
  geom_bar(stat="identity",fill="lightgray",color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=condition, width=0.25),alpha=1)+
  #facet_grid(.~condition)+
  theme_bw()

## fit a linear mixed-effects model
library(lme4)
library(lmerTest)
m = glmer(x~WCO*determiner*animacy+(1|item)+(1|participants), data=d)
summary(m)