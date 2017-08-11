'use strict';
import React, { Component } from 'react';
import {
	View,
	StyleSheet
} from 'react-native'
import {
	Content,
	Text,
	Item,
	Input,
	Icon
} from 'native-base'
import {
	responsiveHeight,
	responsiveWidth
} from 'react-native-responsive-dimensions';


const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: responsiveWidth(100),
		backgroundColor: 'white'
	},
	item: {
		width: responsiveWidth(95),
		height: responsiveHeight(8),
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

class Todo extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {}
	}

	render() {

		let {
			itemName,
			handleIconPress,
			finished
		} = this.props

		return (
			<Content style={styles.mainContainer}>
				<Item style={styles.item} success={finished}>
					<Text > {itemName} </Text>
					<Icon name='checkmark-circle' onPress={handleIconPress} />
				</Item>
			</Content>
		);
	}
}


export default Todo;
