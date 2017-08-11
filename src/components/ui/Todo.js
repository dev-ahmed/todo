'use strict';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

class Item extends Component {

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
				<Text>Item</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: 'white'
	}
})

export default Item;
