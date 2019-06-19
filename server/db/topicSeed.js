/* eslint-disable no-loop-func */
const { Entry, User, TextAnalyze, Topic, TopicKeyword, Sentiment } = require('./models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const emotionObj1 = {
    anger: 0.0177705977382876,
    anticipation: 0.0274636510500808,
    compound: -0.0597371428571429,
    disgust: 0.00969305331179321,
    fear: 0.0274636510500808,
    joy: 0.0193861066235864,
    negative: 0.115828571428571,
    neutral: 0.798285714285714,
    positive: 0.0858857142857143,
    sadness: 0.024232633279483,
    surprise: 0.00969305331179321,
    trust: 0.0177705977382876
}

const topicSeedFunc1 = () => {
    return Promise.all([
        User.findByPk(3, {
            include: [
              {
                model: Entry,
                where: {
                  createdAt: {
                    [Op.lt]: new Date(2018, 11, 31),
                    [Op.gt]: new Date(2018, 6, 1)
                  }
                }
                // createdAt < [timestamp] AND createdAt > [timestamp]
              },
            ],
            order: [
              // Will escape title and validate DESC against a list of valid direction parameters
              ['createdAt', 'DESC'],
            ],
          }).then(async data => {
                const entries = data.entries
                const topics = {
                    Num_Documents: {0: 9, 1: 15, 2: 9, 3: 2},
                    Percent_Documents: {0: 0.2571, 1: 0.4286, 2: 0.2571, 3: 0.0571},
                    Topic_Keywords: {
                      0: "back, end, bad, timekeepe, anymore, mirror, prove, reach, wine, slowly",
                      1: "man, time, fear, people, thought, beauty, flood, movie, week, month",
                      2: "heart, evil, day, pass, fall, water, flood, danger, goodness, shadow",
                      3: "turn, high, faintly, hand, land, shaft, child, god, tide, tor"
                    }
                  }
                const user = await User.findByPk(3);
                const topicCnt = 4;
                const textAnalysis = await TextAnalyze.create();
                const sentiment = await Sentiment.create(emotionObj1);
                for (let i = 0; i < topicCnt; i++) {
                    let splitTopicKeywords = topics.Topic_Keywords[i].split(', ');
                    let uploadTopicKeywords = splitTopicKeywords.map((item, idx) => {
                        return { keyword: item, rank: idx + 1 }
                    })
                    Topic.create({
                        dominantTopicNum: i + 1,
                        numberOfDocuments: topics.Num_Documents[i],
                        percentDocuments: topics.Percent_Documents[i],
                        topickeywords: uploadTopicKeywords,
                        userId: user.id,
                        textanalyzeId: textAnalysis.id
                    }, {
                        include: [ TopicKeyword ]
                    })
                        .then(topic => {
                            entries.map((entry) => {
                                Entry.findByPk(entry.id)
                                    .then(foundEntry => {
                                        foundEntry.addTopic(topic);
                                        foundEntry.update({
                                            textanalyzeId: textAnalysis.id,
                                            sentimentId: sentiment.id
                                        })
                                    })
                                    .catch(error => console.warn(error))
                            })
                        })
                        .catch(error => console.warn(error))
                    }
                })
    ])
}

const emotionObj2 = {
    anger: 0.0119760479041916,
    anticipation: 0.0119760479041916,
    compound: -0.102955172413793,
    disgust: 0.00898203592814371,
    fear: 0.0329341317365269,
    joy: 0.0149700598802395,
    negative: 0.129931034482759,
    neutral: 0.801,
    positive: 0.0690344827586207,
    sadness: 0.0419161676646707,
    surprise: 0.0149700598802395,
    trust: 0.0149700598802395
}

const topicSeedFunc2 = () => {
    return Promise.all([
        User.findByPk(3, {
            include: [
              {
                model: Entry,
                where: {
                  createdAt: {
                    [Op.lt]: new Date(2018, 5, 30),
                    [Op.gt]: new Date(2018, 0, 1)
                  }
                }
                // createdAt < [timestamp] AND createdAt > [timestamp]
              },
            ],
            order: [
              // Will escape title and validate DESC against a list of valid direction parameters
              ['createdAt', 'DESC'],
            ],
          }).then(async data => {
                const entries = data.entries
                const topics = {
                    Num_Documents: {0: 13, 1: 4, 2: 7, 3: 5},
                    Percent_Documents: {0: 0.4483, 1: 0.1379, 2: 0.2414, 3: 0.1724},
                    Topic_Keywords: {
                      0: "feel, thee, life, heart, breath, month, hell, grow, edge, spend",
                      1: "world, animal, meet, special, make, hate, grapple, spit, table, gentle",
                      2: "break, equal, unhappy, family, overturn, show, cry, chimney, end, calendar",
                      3: "kill, protect, thee, fall, destroy, place, afterward, thou, wrong, music"
                    }
                  }
                const user = await User.findByPk(3);
                const topicCnt = 4;
                const textAnalysis = await TextAnalyze.create();
                const sentiment = await Sentiment.create( emotionObj2 );
                for (let i = 0; i < topicCnt; i++) {
                    let splitTopicKeywords = topics.Topic_Keywords[i].split(', ');
                    let uploadTopicKeywords = splitTopicKeywords.map((item, idx) => {
                        return { keyword: item, rank: idx + 1 }
                    })
                    Topic.create({
                        dominantTopicNum: i + 1,
                        numberOfDocuments: topics.Num_Documents[i],
                        percentDocuments: topics.Percent_Documents[i],
                        topickeywords: uploadTopicKeywords,
                        userId: user.id,
                        textanalyzeId: textAnalysis.id
                    }, {
                        include: [ TopicKeyword ]
                    })
                        .then(topic => {
                            entries.map((entry) => {
                                Entry.findByPk(entry.id)
                                    .then(foundEntry => {
                                        foundEntry.addTopic(topic);
                                        foundEntry.update({
                                            textanalyzeId: textAnalysis.id,
                                            sentimentId: sentiment.id
                                        })
                                    })
                                    .catch(error => console.warn(error))
                            })
                        })
                        .catch(error => console.warn(error))
                    }
                })
    ])
}

module.exports = {
    topicSeedFunc1,
    topicSeedFunc2
};
