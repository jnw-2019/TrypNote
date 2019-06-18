import React, { Component } from 'react';
import {
    Button,
    Paper,
    Grid,
    Typography,
    Box,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Card,
    CardActionArea,
    CardContent
} from '@material-ui/core';
import { Input } from '@material-ui/icons';
import {
    red,
    deepPurple,
    blueGrey
} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';

let theme = createMuiTheme();

const styles = {
    mainDisplay: {
        padding: theme.spacing(2),
    },
    textDisplay: {
        padding: theme.spacing(3, 2),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    tableHeader: {
        fontWeight: 600
    },
    negative: {
        backgroundColor: red[900],
        color: 'white'
    },
    positive: {
        backgroundColor: deepPurple[900],
        color: 'white'
    },
    fear: {
        backgroundColor: blueGrey[500],
        color: 'white'
    }
};

class TextAnalyzer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            analyzerResponse: [],
            sentimentResponse: {},
            skew: '',
            emotion: '',
            engineRunning: false
        }
    }

    runTextAnalyzer = () => {
        this.setState({ engineRunning: true })
        // Need to make dynamic
        const userId = 3;
        let textId = 0;
        let callString = `/api/entries/limit/9/user/${userId}`;
        callString = `api/entries/range/from/20180601/to/20181131/user/${userId}`;
        axios.get(callString)
            .then(response => response.data)
            .then(data => {
                const tempObj = data.entries.map(item => item.text);
                const postObj = tempObj.join(' ')
                axios.post('http://127.0.0.1:5000/analyze', { postObj })
                    .then(response => response.data)
                    .then(nlpData => {
                        const topicUpload = {
                            topics: JSON.parse(nlpData.results),
                            entries: data.entries
                        }
                        console.log(JSON.parse(nlpData.results))
                        axios.post(`/api/topics/${userId}`, topicUpload)
                            .then(response => response.data)
                            .then((textAnalyze) => {
                                axios.get(`/api/topics/${userId}/textanalyze/${textAnalyze.id}`)
                                    .then(resTopics => {
                                        textId = textAnalyze.id
                                        this.setState({ analyzerResponse: resTopics.data })
                                    })
                                    .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error));
                    })
            })
        return textId
    }

    runSentiment = () => {
        //this.setState({ engineRunning: true })
        // Need to make dynamic
        const userId = 3
        let callString = `/api/entries/limit/9/user/${userId}`;
        callString = `api/entries/range/from/20180601/to/20181131/user/${userId}`;
        axios.get(callString)
            .then(response => response.data)
            .then(data => {
                const tempObj = data.entries.map(item => item.text);
                const postObj = tempObj.join(' ')
                axios.post('http://127.0.0.1:5000/sentiment', { postObj })
                    .then(response => response.data)
                    .then(nlpData => {
                        nlpData.entries = data.entries;
                        axios.post(`/api/sentiments/`, nlpData)
                            .then(response => response.data)
                            .then(data => {
                                const newStateObj = {sentimentResponse: data}
                                // Negative-Positive sentitment
                                if (data.compound < 0) {
                                    newStateObj.skew = 'negative';
                                } else {
                                    newStateObj.skew = 'positive';
                                }
                                const emotions = ['anger', 'anticipation', 'disgust', 'fear', 'joy', 'sadness', 'surprise', 'trust'];
                                const maxEmotion = {value: 0, emotion: ''};
                                emotions.forEach(item => {
                                    if (data[item] > maxEmotion.value) {
                                        maxEmotion.value = data[item];
                                        maxEmotion.emotion = item;
                                    }
                                });
                                newStateObj.emotion = maxEmotion.emotion;
                                newStateObj.engineRunning = false;
                                // Prominent emotion
                                console.log(data);
                                this.setState(newStateObj);
                            })
                            .catch(error => console.log(error));
                    })
            })
    }

    testApiRoute = () => {
        axios.get(`/api/entries/limit/8/user/3`)
            .then(response => {
                const responseExample = {topics: {
                    Dominant_Topic: {0: 0, 1: 1, 2: 2, 3: 3},
                    Num_Documents: {0: 7, 1: 2, 2: 3, 3: 4},
                    Percent_Documents: {0: 0.4118, 1: 0.1176, 2: 0.2353, 3: 0.2353},
                    Topic_Keywords: {
                        0: 'jay, wet, blue, baby, make, listen, kill, father, enjoy, damn',
                        1: 'thing, corn, miss, hot, touch, tin, sing, winter, eat, cold',
                        2: '-PRON-, mockingbird, heart, baby, nest, kill, hit, year, music, summer',
                        3: 'sin, shoot, atticus, breath, round, remember, garden, hear, gutter, breakfast'
                    }
                }, entries: response.data.entries};
                axios.post('/api/topics/3', responseExample)
                    .then(data => console.log(data))
                    .then(() => {
                        axios.get(`/api/topics/3`)
                            .then( resTopics => this.setState({ analyzerResponse: resTopics.data }) )
                    })
                    .catch(error => console.log(error))
            })
    }

    runNLP = () => {
        this.runTextAnalyzer()
        this.runSentiment()
    }

    render() {
        const { classes } = this.props;
        return (
            <Box className={classes.mainDisplay} borderColor="primary.light" border={1} borderRadius={5}>
                <Box mb={2}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Entry Analyzer
                    </Typography>
                </Box>
                <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.runNLP}>
                            Analyze
                            <Box className={classes.rightIcon}>
                                <Input />
                            </Box>
                        </Button>
                    </Grid>
                    <Grid item xs>
                        {this.state.engineRunning ?
                            <LinearProgress /> :
                            <Paper className={classes.textDisplay}>
                                {
                                    this.state.analyzerResponse[0] ?
                                    <div>
                                        <Grid
                                            container
                                            justify="center"
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item xs>
                                                <Card className={classes[this.state.skew]}>
                                                    <CardActionArea>
                                                        <CardContent justify="center">
                                                            <Typography gutterBottom component="h3">
                                                                Sentiment - {this.state.skew}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                            <Grid item xs>
                                                <Card className={classes[this.state.emotion]}>
                                                    <CardActionArea>
                                                        <CardContent justify="center">
                                                            <Typography gutterBottom component="h3">
                                                                Emotion - {this.state.emotion}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                        <Table>
                                            <TableHead>
                                                <TableRow className={classes.tableHeader}>
                                                    <TableCell>Theme Number</TableCell>
                                                    <TableCell>Keywords</TableCell>
                                                    <TableCell>Entry Coverage</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.analyzerResponse.map(item => {
                                                    return (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.dominantTopicNum}</TableCell>
                                                            <TableCell>
                                                                {
                                                                    item.topickeywords.map(topic => topic.keyword).join(', ')
                                                                }
                                                            </TableCell>
                                                            <TableCell>{item.percentDocuments}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    </div> :
                                    ''
                                }
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    user
});

export default connect(mapStateToProps)(withStyles(styles)(TextAnalyzer));
