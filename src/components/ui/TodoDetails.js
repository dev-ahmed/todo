'use strict';
import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'
import {

} from 'native-base';

export default class ToDoDetails extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {

        // let { } = this.props;
        // let { } = this.state;

        return (
            <View style={styles.mainContainer}>
                <Text>ToDoDetails</Text>
            </View>
        );
    }
}
