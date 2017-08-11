'use strict';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ListView
} from 'react-native'

import { List } from 'native-base';

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: 'white'
	}
})


class Todos extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {}
	}

	render() {

		let { todos } = this.props;
		// let { } = this.state;

		return (
			<List dataArray={todos}>

			</List>
		);
	}
}


export default Item;
