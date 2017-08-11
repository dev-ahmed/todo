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


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Todos extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {}
	}

	render() {

		let { todos, renderRow } = this.props;
		// let { } = this.state;

		return (
			<ListView
				dataSource={todos}
				//dataArray={todos}
				renderRow={(data, rowId, index) => renderRow(data, rowId, index)}
			>
			</ListView>
		);
	}
}


export default Todos;
