'use strict';
import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import {
	Content,
	Text,
	Item,
	Input,
	Icon,
	Button
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
	},
	btn: {
		// backgroundColor: 'transparent'
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
			finished,
			deleteTodo
		} = this.props

		return (
			<Content style={styles.mainContainer}>
				<Item style={styles.item} success={finished}>
					<TouchableOpacity
						style={styles.btn}
						onLongPress={deleteTodo}
					>
						<Text > {itemName} </Text>
					</TouchableOpacity>
					<Icon name='checkmark-circle' onPress={handleIconPress} />
				</Item>
			</Content>
		);
	}
}


export default Todo;
