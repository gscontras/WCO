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

df = df[df$item!="pianist"&df$item!="scientist",]

full <- df

length(unique(full$workerid)) # 233 total including Katherine

df = df[df$subject_information.language!="katherine",]
length(unique(df$workerid)) # 230 total without Greg or Katherine

## filter participants by language
unique(df$subject_information.language)
d = df[df$subject_information.language=="English"|
       df$subject_information.language=="English "|
       df$subject_information.language=="english"|
       df$subject_information.language=="english "|
       df$subject_information.language=="englsih"
       ,]
length(unique(d$workerid)) # 110 monolingual English speakers

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

length(unique(e$workerid)) # 78 passed attention checks

## only critical trials
t = e[e$condition!="filler"&e$condition!="",]


## calculate averages and CIs by condition
d_s = bootsSummary(data=t, measurevar="response", groupvars=c("WCO","animacy","determiner"))

d_s[d_s$animacy=="A",]$animacy = "animate"
d_s[d_s$animacy=="I",]$animacy = "inanimate"

d_s[d_s$WCO=="Y",]$WCO = "WCO"
d_s[d_s$WCO=="N",]$WCO = "no WCO"

## plot results
ggplot(data=d_s,aes(x=WCO,y=response,fill=determiner))+
  geom_bar(stat="identity",position=position_dodge(.9),color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=WCO, width=0.25),alpha=1,position=position_dodge(.9))+
  facet_grid(.~animacy) +
  theme_bw() + 
  ylab("rating\n") +
  scale_fill_manual(values = c("D" = "gray90", "Q" = "gray65"),
                    labels = c("D" = "determiner", "Q" = "quantifier")) +
  labs(x = NULL, fill = NULL)
#ggsave("full-results.png",width=5.5,height=2)

## fit a linear mixed-effects model
library(lme4)
library(lmerTest)
m = lmer(response~WCO*determiner*animacy+(1|item)+(1|workerid), data=t)
summary(m)




## calculate averages and CIs by condition
d_s_no_animacy = bootsSummary(data=t, measurevar="response", groupvars=c("WCO","determiner"))

## plot results
ggplot(data=d_s_no_animacy,aes(x=WCO,y=response,fill=determiner))+
  geom_bar(stat="identity",position=position_dodge(.9),color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=WCO, width=0.25),alpha=1,position=position_dodge(.9))+
  theme_bw()




# histogram of participants

f = matrix(unique(as.factor(t$unique_worker)), ncol = 1)
f = as.data.frame(f)

colnames(f)[1] <- "workerid"
f$N_avg = 0
f$Y_avg = 0

for (i in unique(as.factor(t$unique_worker))){
  f[f$workerid == i,]$N_avg = mean(t[t$unique_worker == i & (t$WCO=="N"),]$response)
  f[f$workerid == i,]$Y_avg = mean(t[t$unique_worker == i & (t$WCO=="Y"),]$response)
  }

f$avgDiff = f$N_avg - f$Y_avg

hist(f$avgDiff)

ggplot(f, aes(x = avgDiff)) +
  geom_histogram(color = "black", fill="gray65", bins=20) +
  #geom_density()+
  theme_bw() +
  xlab("\nrating difference")+
  ylab("count\n")
#ggsave("participant-histogram.png",width=4,height=2)



