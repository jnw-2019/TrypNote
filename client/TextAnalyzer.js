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
    TableRow
} from '@material-ui/core';
import { Input } from '@material-ui/icons';
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
    }
};

class TextAnalyzer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            analyzerResponse: [],
            engineRunning: false
        }
    }

    runTextAnalyzer = () => {
        this.setState({ engineRunning: true })
        // Need to make dynamic
        const userId = 3
        axios.get(`/api/entries/limit/6/user/${userId}`)
            .then(response => response.data)
            .then(data => {
                const tempObj = data.entries.map(item => item.text);
                const postObj = tempObj.join(' ')
                axios.post('http://127.0.0.1:5000/analyze', { postObj })
                    .then(response => response.data)
                    .then(nplData => {
                        const topicUpload = {
                            topics: JSON.parse(nplData.results),
                            entries: data.entries
                        }
                        console.log(JSON.parse(nplData.results))
                        axios.post(`/api/topics/${userId}`, topicUpload)
                            .then(responseTopics => console.log(responseTopics))
                            .then(() => {
                                axios.get(`/api/topics/${userId}`)
                                    .then(resTopics => console.log(resTopics))
                            })
                            .catch(error => console.log(error))
                        this.setState({ analyzerResponse: nplData.results, engineRunning: false })
                    })
            })
    }

    testApiRoute = () => {
        axios.get(`/api/entries/limit/6/user/3`)
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
                            .then( resTopics => this.setState({ analyzerResponse: resTopics.data, engineRunning: false }) )
                    })
                    .catch(error => console.log(error))
            })
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
                        <Button variant="contained" color="primary" onClick={this.testApiRoute}>
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
                                    <Table>
                                        <TableHead>
                                            <TableRow className={classes.tableHeader}>
                                                <TableCell>Theme Number</TableCell>
                                                <TableCell>Keywords</TableCell>
                                                <TableCell>Entry Coverage</TableCell>
                                                <TableCell>Postivity</TableCell>
                                                <TableCell>Sentiment</TableCell>
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
                                                        <TableCell>Temp</TableCell>
                                                        <TableCell>Temp</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table> :
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
