'use strict';
import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { styles } from './style';

import BottomMenu from '@ui/BottomMenu';

const buttons = [
	'All',
	'Active',
	'Completed'
];
export default class Main extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			todos: []
		}
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	render() {

		// let { } = this.props;
		let {
			todos
		} = this.state;

		return (
			<View style={styles.mainContainer}>
				<View style={styles.subContainer}>
					<Text>TodoApp</Text>
				</View>
				<BottomMenu buttons={buttons} />
			</View>
		);
	}
}
