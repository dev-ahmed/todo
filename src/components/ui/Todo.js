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
	Button,
	ListItem
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
		width: responsiveWidth(80)
	}
})

class Todo extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {}
	}

	render() {

		let {
			handleIconPress,
			deleteTodo,
			onPress,
			item,
			itemTextColor
		} = this.props

		return (
			// <Content style={styles.mainContainer} disableKBDismissScroll >
			<Item style={[styles.item]} success={item.checked} >
				<TouchableOpacity
					style={styles.btn}
					onLongPress={deleteTodo}
					onPress={onPress}
				>
					<Text style={{ color: itemTextColor }} numberOfLines={2} > {item.name} </Text>
				</TouchableOpacity>
				<Icon name='checkmark-circle' onPress={handleIconPress} />
			</Item>
			// </Content>
		);
	}
}


export default Todo;
