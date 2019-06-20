const router = require('express').Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const { Topic, TopicKeyword, Entry, User, TextAnalyze } = require('../db/models');

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

router.get('/:userId/textanalyze/:id', (req, res, next) => {
    Topic.findAll({
        where: {
            userId: req.params.userId,
            textanalyzeId: req.params.id
        },
        include: [
            {
                model: TopicKeyword,
                where: {
                    keyword: {[Op.ne]: '-PRON-'}
                },
            },
            { model: Entry }
        ],
        order: [
            [ 'dominantTopicNum' ],
            [ TopicKeyword, 'rank' ]
        ],
    })
        .then(data => res.send(data))
        .catch(next);
})

router.get('/:userId/limit/:limitNum', (req, res, next) => {
    Topic.findAll({
        where: {
            userId: req.params.userId
        },
        include: [
            {
                model: TopicKeyword,
                where: {
                    keyword: {[Op.ne]: '-PRON-'}
                },
            },
            { model: Entry }
        ],
        order: [
            [ 'dominantTopicNum' ],
            [ TopicKeyword, 'rank' ]
        ],
        limit: req.params.limitNum
    })
        .then(data => res.send(data))
        .catch(next);
})


router.get('/:userId/limit/:limitNum', (req, res, next) => {
    Topic.findAll({
        where: {
            userId: req.params.userId
        },
        include: [
            {
                model: TopicKeyword,
                where: {
                    keyword: {[Op.ne]: '-PRON-'}
                },
            },
            { model: Entry }
        ],
        order: [
            [ 'dominantTopicNum' ],
            [ TopicKeyword, 'rank' ]
        ],
        limit: req.params.limitNum
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
            {
                model: TopicKeyword,
                where: {
                    keyword: {[Op.ne]: '-PRON-'}
                },
            },
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
    const textAnalysis = await TextAnalyze.create();
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
                entries.map((entry, idx) => {
                    Entry.findByPk(entry.id)
                        .then(foundEntry => {
                            foundEntry.addTopic(topic);
                            foundEntry.update({textanalyzeId: textAnalysis.id})
                        })
                        .then(() => {
                            if (idx === entries.length - 1 && i === topicCnt - 1) {
                                res.send(textAnalysis);
                            }
                        })
                        .catch(next)
                })
            })
            .catch(next)
    }
});

module.exports = router;
