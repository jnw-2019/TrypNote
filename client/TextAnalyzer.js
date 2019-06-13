import React, { Component } from 'react';
import {
    Button,
    Paper,
    Grid,
    Typography,
    Box,
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
};

class TextAnalyzer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            analyzerResponse: 'This is where the results go'
        }
    }

    runTextAnalyzer = () => {
        axios.get(`/api/entries/limit/6/user/3`)
            .then(response => response.data)
            .then(data => {
                const tempObj = data.entries.map(item => item.text);
                const postObj = tempObj.join(' ')
                axios.post('http://127.0.0.1:5000/analyze', { postObj })
                    .then(response => response.data)
                    .then(nplData => {
                        console.log(nplData)
                        this.setState({ analyzerResponse: nplData.results })
                    })
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
                        <Button variant="contained" color="primary" onClick={this.runTextAnalyzer}>
                            Analyze
                            <Box className={classes.rightIcon}>
                                <Input />
                            </Box>
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.textDisplay}>
                            {this.state.analyzerResponse}
                        </Paper>
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
