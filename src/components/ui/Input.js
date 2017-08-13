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
			addNewTodo,
			onChangeText
		 } = this.props;
		let {
			inputValue
		 } = this.state;

		return (
			<Item rounded>
				<Input
					style={styles.input}
					onSubmitEditing={() => {
						inputValue && inputValue.length > 0 ? addNewTodo(inputValue) : null
						this.setState({ inputValue: null })
					}}
					placeholder='Add your todo'
					value={inputValue}
					onChangeText={(inputValue) => {
						onChangeText(inputValue)
						this.setState({ inputValue })
					}
					} />
				<Button
					transparent
					onPress={() => {
						inputValue && inputValue.length > 0 ? addNewTodo(inputValue) : null
						this.setState({ inputValue: null })
					}}
				>
					<Icon
						name='add-circle' />
				</Button>
			</Item>
		);
	}
}
