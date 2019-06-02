const conn = require('./db');
const { Entry, User, Weather, Location, Category } = require('./models/');

const entrySeed = [
    {
        title: 'To Kill a Mockingbird',
        text: 'Atticus said to Jem one day, “I’d rather you shot at tin cans in the backyard, but I know you’ll go after birds. Shoot all the blue jays you want, if you can hit ‘em, but remember it’s a sin to kill a mockingbird.” That was the only time I ever heard Atticus say it was a sin to do something, and I asked Miss Maudie about it. “Your father’s right,” she said. “Mockingbirds don’t do one thing except make music for us to enjoy. They don’t eat up people’s gardens, don’t nest in corn cribs, they don’t do one thing but sing their hearts out for us. That’s why it’s a sin to kill a mockingbird.',
    },
    {
        title: 'The Bell Jar',
        text: 'I took a deep breath and listened to the old brag of my heart. I am, I am, I am.'
    },
    {
        title: 'The Little Prince',
        text: 'The most beautiful things in the world cannot be seen or touched, they are felt with the heart.'
    },
    {
        title: 'God Bless You, Mr. Rosewarer',
        text: 'Hello babies. Welcome to Earth. It’s hot in the summer and cold in the winter. It’s round and wet and crowded. On the outside, babies, you’ve got a hundred years here. There’s only one rule that I know of, babies-“God damn it, you’ve got to be kind.'
    },
    {
        title: 'Alice in Wonderland',
        text: 'Why, sometimes I’ve believed as many as six impossible things before breakfast.'
    },
    {
        title: 'Lady Windermere’s Fan',
        text: 'We are all in the gutter, but some of us are looking at the stars.'
    },
    {
        title: 'Dune',
        text: 'I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.'
    },
    {
        title: 'The Road',
        text: 'Just remember that the things you put into your head are there forever, he said. You might want to think about that. You forget some things, dont you? Yes. You forget what you want to remember and you remember what you want to forget.'
    },
    {
        title: 'Handle With Care',
        text: 'You can tell yourself that you would be willing to lose everything you have in order to get something you want. But it’s a catch-22: all of those things you’re willing to lose are what make you recognizable. Lose them, and you’ve lost yourself.'
    },
    {
        title: 'On The Road',
        text: 'The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars.'
    },
    {
        title: 'Love in the Time of Cholera',
        text: 'He allowed himself to be swayed by his conviction that human beings are not born once and for all on the day their mothers give birth to them, but that life obliges them over and over again to give birth to themselves.'
    },
    {
        title: 'American Psycho',
        text: 'There is an idea of a Patrick Bateman, some kind of abstraction, but there is no real me, only an entity, something illusory, and though I can hide my cold gaze and you can shake my hand and feel flesh gripping yours and maybe you can even sense our lifestyles are probably comparable: I simply am not there.'
    },
    {
        title: 'Kafka on the Shore',
        text: 'Sometimes fate is like a small sandstorm that keeps changing directions. You change direction but the sandstorm chases you. You turn again, but the storm adjusts. Over and over you play this out, like some ominous dance with death just before dawn. Why? Because this storm isn’t something that blew in from far away, something that has nothing to do with you. This storm is you. Something inside of you. So all you can do is give in to it, step right inside the storm, closing your eyes and plugging up your ears so the sand doesn’t get in, and walk through it, step by step. There’s no sun there, no moon, no direction, no sense of time. Just fine white sand swirling up into the sky like pulverized bones. That’s the kind of sandstorm you need to imagine. And you really will have to make it through that violent, metaphysical, symbolic storm. No matter how metaphysical or symbolic it might be, make no mistake about it: it will cut through flesh like a thousand razor blades. People will bleed there, and you will bleed too. Hot, red blood. You’ll catch that blood in your hands, your own blood and the blood of others. And once the storm is over you won’t remember how you made it through, how you managed to survive. You won’t even be sure, in fact, whether the storm is really over. But one thing is certain. When you come out of the storm you won’t be the same person who walked in. That’s what this storm’s all about.'
    },
    {
        title: 'The Wonderful Wizard of Oz',
        text: 'A heart is not judged by how much you love; but by how much you are loved by others'
    },
    {
        title: 'Extremely Loud and Incredibly Close',
        text: 'Sometimes I can hear my bones straining under the weight of all the lives I’m not living.'
    },
    {
        title: 'Different Seasons',
        text: 'The most important things are the hardest to say. They are the things you get ashamed of, because words diminish them — words shrink things that seemed limitless when they were in your head to no more than living size when they’re brought out. But it’s more than that, isn’t it? The most important things lie too close to wherever your secret heart is buried, like landmarks to a treasure your enemies would love to steal away. And you may make revelations that cost you dearly only to have people look at you in a funny way, not understanding what you’ve said at all, or why you thought it was so important that you almost cried while you were saying it. That’s the worst, I think. When the secret stays locked within not for want of a teller but for want of an understanding ear.'
    },
    {
        title: 'The Chronology of Water',
        text: 'I don’t have any problem understanding why people flunk out of college or quit their jobs or cheat on each other or break the law or spray-paint walls. A little bit outside of things is where some people feel each other. We do it to replace the frame of family. We do it to erase and remake our origins in their own images. To say, I too was here.'
    },
    {
        title: 'The Glass Castle',
        text: 'I never believed in Santa Claus. None of us kids did. Mom and Dad refused to let us. They couldn’t afford expensive presents and they didn’t want us to think we weren’t as good as other kids who, on Christmas morning, found all sorts of fancy toys under the tree that were supposedly left by Santa Claus. Dad had lost his job at the gypsum, and when Christmas came that year, we had no money at all. On Christmas Eve, Dad took each one of us kids out into the desert night one by one. “Pick out your favorite star”, Dad said. “I like that one!” I said. Dad grinned, “that’s Venus”, he said. He explained to me that planets glowed because reflected light was constant and stars twinkled because their light pulsed. “I like it anyway” I said. “What the hell,” Dad said. “It’s Christmas. You can have a planet if you want.” And he gave me Venus. Venus didn’t have any moons or satellites or even a magnetic field, but it did have an atmosphere sort of similar to Earth’s, except it was super hot-about 500 degrees or more. “So,” Dad said, “when the sun starts to burn out and Earth turns cold, everyone might want to move to Venus to get warm. And they’ll have to get permission from your descendants first. We laughed about all the kids who believed in the Santa myth and got nothing for Christmas but a bunch of cheap plastic toys. “Years from now, when all the junk they got is broken and long forgotten,” Dad said, “you’ll still have your stars.'
    },
    {
        title: 'Song of Solomon',
        text: 'You think because he doesn’t love you that you are worthless. You think that because he doesn’t want you anymore that he is right — that his judgement and opinion of you are correct. If he throws you out, then you are garbage. You think he belongs to you because you want to belong to him. Don’t. It’s a bad word, ‘belong.’ Especially when you put it with somebody you love. Love shouldn’t be like that. Did you ever see the way the clouds love a mountain? They circle all around it; sometimes you can’t even see the mountain for the clouds. But you know what? You go up top and what do you see? His head. The clouds never cover the head. His head pokes through, beacuse the clouds let him; they don’t wrap him up. They let him keep his head up high, free, with nothing to hide him or bind him. You can’t own a human being. You can’t lose what you don’t own. Suppose you did own him. Could you really love somebody who was absolutely nobody without you? You really want somebody like that? Somebody who falls apart when you walk out the door? You don’t, do you? And neither does he. You’re turning over your whole life to him. Your whole life, girl. And if it means so little to you that you can just give it away, hand it to him, then why should it mean any more to him? He can’t value you more than you value yourself.'
    },
    {
        title: 'Slouching Towards Bethlehem',
        text: '…I think we are well-advised to keep on nodding terms with the people we used to be, whether we find them attractive company or not. Otherwise they turn up unannounced and surprise us, come hammering on the mind’s door at 4 a.m. of a bad night and demand to know who deserted them, who betrayed them, who is going to make amends. We forget all too soon the things we thought we could never forget. We forget the loves and the betrayals alike, forget what we whispered and what we screamed, forget who we were.'
    },
    {
        title: 'Factotum',
        text: 'If you’re going to try, go all the way. Otherwise, don’t even start. This could mean losing girlfriends, wives, relatives and maybe even your mind. It could mean not eating for three or four days. It could mean freezing on a park bench. It could mean jail. It could mean derision. It could mean mockery–isolation. Isolation is the gift. All the others are a test of your endurance, of how much you really want to do it. And, you’ll do it, despite rejection and the worst odds. And it will be better than anything else you can imagine. If you’re going to try, go all the way. There is no other feeling like that. You will be alone with the gods, and the nights will flame with fire. You will ride life straight to perfect laughter. It’s the only good fight there is.'
    },
    {
        title: 'Sombrero Fallout',
        text: 'I will be very careful the next time I fall in love, she told herself. Also, she had made a promise to herself that she intended on keeping. She was never going to go out with another writer: no matter how charming, sensitive, inventive or fun they could be. They weren’t worth it in the long run. They were emotionally too expensive and the upkeep was complicated. They were like having a vacuum cleaner around the house that broke all the time and only Einstein could fix it. She wanted her next lover to be a broom.'
    },
    {
        title: 'The Book Thief',
        text: 'Usually we walk around constantly believing ourselves. “I’m okay” we say. “I’m alright”. But sometimes the truth arrives on you and you can’t get it off. That’s when you realize that sometimes it isn’t even an answer–it’s a question. Even now, I wonder how much of my life is convinced.'
    },
    {
        title: '100 Love Sonnets',
        text: 'I love you without knowing how, or when, or from where. I love you simply, without problems or pride: I love you in this way because I do not know any other way of loving but this, in which there is no I or you, so intimate that your hand upon my chest is my hand, so intimate that when I fall asleep your eyes close.'
    },
    {
        title: 'The Invitation',
        text: 'It doesn’t interest me what you do for a living. I want to know what you ache for, and if you dare to dream of meeting your heart’s longing. It doesn’t interest me how old you are. I want to know if you will risk looking like a fool for love, for your dream, for the adventure of being alive. It doesn’t interest me what planets are squaring your moon. I want to know if you have touched the center of your own sorrow, if you have been opened by life’s betrayals or have become shriveled and closed from fear of further pain!I want to know if you can sit with pain, mine or your own, without moving to hide it or fade it, or fix it. I want to know if you can be with joy, mine or your own, if you can dance with wildness and let the ecstasy fill you to the tips of your fingers and toes without cautioning us to be careful, to be realistic, to remember the limitations of being human. It doesn’t interest me if the story you are telling me is true. I want to know if you can disappoint another to be true to yourself; if you can bear the accusation of betrayal and not betray your own soul; if you can be faithless and therefore trustworthy. I want to know if you can see beauty even when it’s not pretty, every day,and if you can source your own life from its presence. I want to know if you can live with failure, yours and mine, and still stand on the edge of the lake and shout to the silver of the full moon, “Yes!” It doesn’t interest me to know where you live or how much money you have. I want to know if you can get up, after the night of grief and despair, weary and bruised to the bone, and do what needs to be done to feed the children. It doesn’t interest me who you know or how you came to be here. I want to know if you will stand in the center of the fire with me and not shrink back. It doesn’t interest me where or what or with whom you have studied. I want to know what sustains you, from the inside, when all else falls away. I want to know if you can be alone with yourself and if you truly like the company you keep in the empty moments.'
    }
];

const entrySeedLocations = [
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.704872',
        longitude: '-74.008755'
    },
    {
        latitude: '40.771939',
        longitude: '-73.974734'
    },
    {
        latitude: '40.771939',
        longitude: '-73.974734'
    },
    {
        latitude: '40.718234',
        longitude: '-74.016265'
    },
    {
        latitude: '40.722138',
        longitude: '-74.002588'
    },
    {
        latitude: '40.722138',
        longitude: '-74.002588'
    },
    {
        latitude: '40.722138',
        longitude: '-74.002588'
    },
    {
        latitude: '40.730089',
        longitude: '-74.005004'
    },
    {
        latitude: '40.730089',
        longitude: '-74.005004'
    },
    {
        latitude: '40.747621',
        longitude: '-74.004916'
    },
    {
        latitude: '40.747621',
        longitude: '-74.004916'
    },
    {
        latitude: '40.747621',
        longitude: '-74.004916'
    },
    {
        latitude: '40.686702',
        longitude: '-73.984787'
    },
    {
        latitude: '40.686702',
        longitude: '-73.984787'
    },
    {
        latitude: '40.686702',
        longitude: '-73.984787'
    },
    {
        latitude: '40.686702',
        longitude: '-73.984787'
    },
    {
        latitude: '40.680087',
        longitude: '-73.967745'
    },
    {
        latitude: '40.680087',
        longitude: '-73.967745'
    },
    {
        latitude: '40.680087',
        longitude: '-73.967745'
    }
]

const entryUsers = [
    {
        firstname: 'George',
        lastname: 'Parker',
        phonenumber: '555-222-2910',
        email: 'gparker@email.com',
        password: 'abcde',
    },
    {
        firstname: 'June',
        lastname: 'Lee',
        phonenumber: '555-091-2001',
        email: 'junelee@email.com',
        password: '11100'
    },
    {
        firstname: 'Mary',
        lastname: 'King',
        email: 'mary@email.com',
        phonenumber: '555-389-5571',
        password: '991122'
    }
]

const entryWeather = [
    {
        forecast: 'cloudy',
        degrees: 88,
    },
    {
        forecast: 'sunny',
        degrees: 75,
    },
    {
        forecast: 'rainy',
        degrees: 50,
    }
]

const secondSeedFunc = () => {
    return Promise.all(
        entryUsers.map(item => User.create(item))
    )
        .then(newUsers => {
            return Promise.all([
                Entry.create({...entrySeed[0], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[1], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[2], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[3], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[4], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[5], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[6], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[7], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[8], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[9], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[10], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[11], userId: newUsers[2].dataValues.id}),
                Entry.create({...entrySeed[12], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[13], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[14], userId: newUsers[2].dataValues.id}),
                Entry.create({...entrySeed[15], userId: newUsers[2].dataValues.id}),
                Entry.create({...entrySeed[16], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[17], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[18], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[19], userId: newUsers[1].dataValues.id}),
                Entry.create({...entrySeed[20], userId: newUsers[2].dataValues.id}),
                Entry.create({...entrySeed[21], userId: newUsers[2].dataValues.id}),
                Entry.create({...entrySeed[22], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[23], userId: newUsers[0].dataValues.id}),
                Entry.create({...entrySeed[24], userId: newUsers[1].dataValues.id}),
            ])
        })
        .then(newEntries => {
            return Promise.all(
                newEntries.map((singleNewEntry, idx) => {
                    Location.create({...entrySeedLocations[idx], entryId: singleNewEntry.dataValues.id})
                    if (idx < 10) {
                        Weather.create({...entryWeather[0], entryId: singleNewEntry.dataValues.id})
                    } else if (idx < 20) {
                        Weather.create({...entryWeather[1], entryId: singleNewEntry.dataValues.id})
                    } else {
                        Weather.create({...entryWeather[2], entryId: singleNewEntry.dataValues.id})
                    }
                })
            )
        })
        .catch(err => console.log(err))
}

module.exports = secondSeedFunc;
