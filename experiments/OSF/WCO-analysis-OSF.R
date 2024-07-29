library(lme4)
library(ggplot2)
library(reshape2)
library(lmerTest)
library(bootstrap)

## load helper file for bootstrapped CIs
bootsSummary <- function(data=NULL, measurevar, groupvars=NULL, na.rm=FALSE,
                         conf.interval=.95, .drop=TRUE, n_boots_samps=10000) {
  require(plyr)
  
  # New version of length which can handle NA's: if na.rm==T, don't count them
  length2 <- function (x, na.rm=FALSE) {
    if (na.rm) sum(!is.na(x))
    else       length(x)
  }
  
  # This does the summary. For each group's data frame, return a vector with
  # N, mean, and sd
  datac <- ddply(data, groupvars, .drop=.drop,
                 .fun = function(xx, col) {
                   c(N    = length2(xx[[col]], na.rm=na.rm),
                     mean = mean   (xx[[col]], na.rm=na.rm),
                     bootsci_high = quantile( #doesn't play nice with na.rm
                       replicate(n_boots_samps, mean(sample(xx[[col]], replace = TRUE))),
                       c(0.025, 0.975))[["97.5%"]],
                     bootsci_low = quantile( #doesn't play nice with na.rm
                       replicate(n_boots_samps, mean(sample(xx[[col]], replace = TRUE))),
                       c(0.025, 0.975))[["2.5%"]]
                   )
                 },
                 measurevar
  )
  
  # Rename the "mean" column    
  datac <- rename(datac, c("mean" = measurevar))
  
  return(datac)
}

## load full data file
df = read.csv("raw-data-anonymous.csv",header=T)

df = df[df$item!="pianist"&df$item!="scientist",]

full <- df

length(unique(full$workerid)) # 233 total 

df = df[df$subject_information.language!="katherine",]
length(unique(df$workerid)) # 230 total without experimenter test runs

## filter participants by language
unique(df$subject_information.language)
d = df[df$subject_information.language=="English"|
       df$subject_information.language=="English "|
       df$subject_information.language=="english"|
       df$subject_information.language=="english "|
       df$subject_information.language=="englsih"
       ,]
length(unique(d$workerid)) # 110 monolingual English speakers

## filler check
d$filler_type = NA
d[d$item == "filler1" |
  d$item == "filler2" |
  d$item == "filler3",]$filler_type = "good"
d[d$item == "filler4" |
    d$item == "filler5" |
    d$item == "filler6",]$filler_type = "bad"
d$filler_check = NA

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

# rename factor levels
d_s$animacy <- ifelse(d_s$animacy == "A", "animate", "inanimate")
d_s$WCO <- ifelse(d_s$WCO == "Y", "WCO", "no WCO")

## plot results
ggplot(data=d_s,aes(x=WCO,y=response,fill=determiner))+
  geom_bar(stat="identity",position=position_dodge(.9),color="black")+
  geom_errorbar(aes(ymin=bootsci_low, ymax=bootsci_high, x=WCO, width=0.25),alpha=1,position=position_dodge(.9))+
  facet_grid(.~animacy) +
  theme_bw() + 
  ylab("rating\n") +
  scale_fill_manual(values = c("D" = "gray90", "Q" = "gray65"),
                    labels = c("D" = "R-expression", "Q" = "quantifier")) +
  labs(x = NULL, fill = NULL)
#ggsave("full-results.png",width=5.5,height=2)

## fit a linear mixed-effects model
m = lmer(response~WCO*determiner*animacy+(1|item)+(1|workerid), data=t)
summary(m)

# aggregate responses by WCO
aggregate(response~WCO, data=t, FUN=mean)

aggregate(response~filler_type, data=e[e$condition=="filler",], FUN=mean)

## histogram of participants

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

ggplot(f, aes(x = avgDiff)) +
  geom_histogram(color = "black", fill="gray65", bins=20) +
  #geom_density()+
  theme_bw() +
  xlab("\nrating difference")+
  ylab("count\n")
#ggsave("participant-histogram.png",width=4,height=2)



