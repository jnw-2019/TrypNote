const router = require('express').Router();
const { Topic, TopicKeyword, Entry, User } = require('../db/models');

router.get('/', (req, res, next) => {
    Topic.findAll({
        include: [
            { model: TopicKeyword },
            { model: Entry }
        ],
        order: [
            [ 'dominantTopicNum' ],
            [ TopicKeyword, 'rank' ]
        ]
    })
        .then(data => res.send(data))
        .catch(next);
})

router.get('/:userId', (req, res, next) => {
    Topic.findAll({
        where: {
            userId: req.params.userId
        },
        include: [
            { model: TopicKeyword },
            { model: Entry }
        ],
        order: [
            [ 'dominantTopicNum' ],
            [ TopicKeyword, 'rank' ]
        ]
    })
        .then(data => res.send(data))
        .catch(next);
})

router.post('/:userId', async (req, res, next) => {
    const { topics, entries } = req.body;
    const topicCnt = Object.keys(topics).length;
    const user = await User.findByPk(req.params.userId);
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
            userId: user.id
        }, {
            include: [ TopicKeyword ]
        })
            .then(topic => {
                entries.map((entry, idx) => {
                    Entry.findByPk(entry.id)
                        .then(foundEntry => foundEntry.addTopic(topic))
                        .then(() => {
                            if (idx === entries.length - 1 && i === topicCnt - 1) {
                                res.sendStatus(201);
                            }
                        })
                        .catch(next)
                })
            })
            .catch(next)
    }
    
});

module.exports = router;
