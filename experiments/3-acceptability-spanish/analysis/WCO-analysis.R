## set working directory
setwd("~/git/WCO/experiments/3-acceptability-spanish/analysis/")

## load helper file for bootstrapped CIs
source("helpers.r")

## load full data file
df_s = read.csv("3-acceptability-spanish-merged.csv",header=T)
head(df_s)
d_s = subset(df_s, select = -c(proliferate.condition,catch_trials,subject_information.enjoyment,system.Browser,system.OS,system.screenH,system.screenW))

df <- d_s

length(unique(df$workerid)) # 103

## filter participants by language
unique(df$subject_information.language)

d = df[df$subject_information.language!="Ingles"&
         df$subject_information.language!="",]
length(unique(d$workerid)) # 99

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

e <- d

for(i in unique(as.factor(e$workerid))) {
  tempsum <- sum(e[e$workerid==i,]$filler_correct)
  if(tempsum<5) {
    e = e[e$workerid != i,]
  }
}

length(unique(e$workerid)) # 39

## only critical trials
t = e[e$condition!="filler"&e$condition!="",]

colnames(t)[colnames(t) == "animacy"] <- "relativizer"

## calculate averages and CIs by condition
d_s = bootsSummary(data=t, measurevar="response", groupvars=c("WCO","relativizer","determiner"))


# rename factor levels
d_s$relativizer <- ifelse(d_s$relativizer == "a", "a quien", "que")
d_s$WCO <- ifelse(d_s$WCO == "y", "WCO", "no WCO")

## plot results
ggplot(data=d_s,aes(x=WCO,y=response,fill=determiner))+
  geom_bar(stat="identity",position=position_dodge(.9),color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=WCO, width=0.25),alpha=1,position=position_dodge(.9))+
  facet_grid(.~relativizer) +
  theme_bw() + 
  ylab("rating\n") +
  scale_fill_manual(values = c("D" = "gray90", "Q" = "gray65"),
                    labels = c("D" = "definite", "Q" = "quantifier")) +
  labs(x = NULL, fill = NULL)
#ggsave("full-results-spanish.png",width=5.5,height=2)


## fit a linear mixed-effects model
library(lme4)
library(lmerTest)
m = lmer(response~WCO*determiner*relativizer+(1|item)+(1|workerid), data=t)
summary(m)




## calculate differences by participant

f = matrix(unique(as.factor(t$workerid)), ncol = 1)
f = as.data.frame(f)

colnames(f)[1] <- "worker"
f$N_avg = 0
f$Y_avg = 0

for (i in unique(t$workerid)){
  f[f$worker == i,]$N_avg = mean(t[t$workerid == i & (t$WCO=="n"),]$response)
  f[f$worker == i,]$Y_avg = mean(t[t$workerid == i & (t$WCO=="y"),]$response)
  }

f$avgDiff = f$N_avg - f$Y_avg

hist(f$avgDiff)





