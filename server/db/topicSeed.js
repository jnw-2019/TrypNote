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
                const sentiment = await Sentiment.create( emotionObj1 );
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
                    Num_Documents: {0: 8, 1: 8, 2: 9, 3: 4},
                    Percent_Documents: {0: 0.2759, 1: 0.2759, 2: 0.3103, 3: 0.1379},
                    Topic_Keywords: {
                        0: "thee, world, protect, wake, spend, darkness, make, broken, learn, special",
                        1: "kill, break, unhappy, animal, start, whale, wrong, bad, people, gentle",
                        2: "feel, grapple, destroy, smoke, edge, overturn, rest, table, cry, happy",
                        3: "fall, family, equal, hate, courage, breath, chimney, fly, impartially, roll"
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

const emotionObj3 = {
    anger: 0.015817223198594,
    anticipation: 0.015817223198594,
    compound: 0.181131914893617,
    disgust: 0.0123022847100176,
    fear: 0.0219683655536028,
    joy: 0.0175746924428823,
    negative: 0.0574468085106383,
    neutral: 0.806914893617021,
    positive: 0.135553191489362,
    sadness: 0.023725834797891,
    surprise: 0.0070298769771529,
    trust: 0.0210896309314587
}

const topicSeedFunc3 = () => {
    return Promise.all([
        User.findByPk(3, {
            include: [
              {
                model: Entry,
                where: {
                  createdAt: {
                    [Op.lt]: new Date(2017, 11, 31),
                    [Op.gt]: new Date(2017, 6, 1)
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
                    Num_Documents: {0: 11, 1: 17, 2: 12, 3: 7},
                    Percent_Documents: {0: 0.234, 1: 0.3617, 2: 0.2553, 3: 0.1489},
                    Topic_Keywords: {
                        0: "hand, life, stand, birth, dream, fun, mother, eye, shake, cold",
                        1: "love, mad, live, burn, true, simply, give, intimate, story, human",
                        2: "interest, fall, mine, pain, betrayal, flight, life, flower, break, sit",
                        3: "time, give, shrivel, morning, careful, weary, long, funeral, storm, writer"
                    }
                  }
                const user = await User.findByPk(3);
                const topicCnt = 4;
                const textAnalysis = await TextAnalyze.create();
                const sentiment = await Sentiment.create( emotionObj3 );
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

const emotionObj4 = {
    anger: 0.0332640332640333,
    anticipation: 0.0103950103950104,
    compound: -0.0965515151515152,
    disgust: 0.0166320166320166,
    fear: 0.0353430353430353,
    joy: 0.0145530145530146,
    negative: 0.124727272727273,
    neutral: 0.779060606060606,
    positive: 0.0961818181818182,
    sadness: 0.027027027027027,
    surprise: 0.00831600831600832,
    trust: 0.0249480249480249
}

const topicSeedFunc4 = () => {
    return Promise.all([
        User.findByPk(3, {
            include: [
              {
                model: Entry,
                where: {
                  createdAt: {
                    [Op.lt]: new Date(2017, 5, 30),
                    [Op.gt]: new Date(2017, 0, 1)
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
                    Num_Documents: {0: 15, 1: 5, 2: 7, 3: 6},
                    Percent_Documents: {0: 0.4545, 1: 0.1515, 2: 0.2121, 3: 0.1818},
                    Topic_Keywords: {
                        0: "lose, forget, baby, shoot, make, world, touch, breakfast, hit, feel",
                        1: "atticus, put, round, time, blue, father, eye, remain, god, permit",
                        2: "fear, remember, sin, mockingbird, kill, gutter, eat, beautiful, breath, deep",
                        3: "thing, -PRON-, heart, mind, maudie, miss, path, forever, recognizable, nest"
                    }
                  }
                const user = await User.findByPk(3);
                const topicCnt = 4;
                const textAnalysis = await TextAnalyze.create();
                const sentiment = await Sentiment.create( emotionObj4 );
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
    topicSeedFunc2,
    topicSeedFunc3,
    topicSeedFunc4
};
