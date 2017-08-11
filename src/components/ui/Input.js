'use strict';
import React, { Component } from 'react';
import {
	StyleSheet
} from 'react-native'
import {
	Container,
	Content,
	Input,
	Icon,
	Button,
	Item
} from 'native-base'
import { responsiveHeight } from 'react-native-responsive-dimensions';


const styles = StyleSheet.create({
	mainContainer: {
		height: 40
	},
	input: {
		height: 50
	}
})


export default class TodoInput extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			inputValue: null
		}
	}

	render() {

		let {
			addNewTodo
		 } = this.props;
		let {
			inputValue
		 } = this.state;

		return (
			<Item rounded>
				<Input
					placeholder='Add your todo'
					value={inputValue}
					onChangeText={inputValue => this.setState({ inputValue })} />
				<Icon
					name='add-circle'
					onPress={() => {
						inputValue.length > 0 ? addNewTodo(inputValue) : null
						this.setState({ inputValue: null })
					}} />
			</Item>
		);
	}
}
