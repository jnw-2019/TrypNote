/* eslint-disable no-loop-func */
const { Entry, User, TextAnalyze, Topic, TopicKeyword, Sentiment } = require('./models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const emotionObj = {
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

const topicSeedFunc = () => {
    return Promise.all([
        console.log('test'),
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
                console.log(entries[1].id)
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
                const sentiment = await Sentiment.create(emotionObj);
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

module.exports = topicSeedFunc;
