'use strict';
import React, { Component } from 'react';
import {
	View,
	Easing,
	StyleSheet,
	TouchableOpacity
} from 'react-native'
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Text,
	Body,
	Textarea,
	Badge
} from 'native-base';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'

import Modal from 'react-native-modalbox';

const styles = StyleSheet.create({
	body: {
		height: responsiveHeight(20)
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	badge: {
		width: 15,
		height: 15,
		// borderRadius: 50
	}
})

export default class ToDoDetails extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			text: props.todoText
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ text: nextProps.todoText })
	}

	render() {

		let {
			isOpen,
			onClose,
			todoText,
			onChangeText,
			date,
			colors,
			activeColor,
			setTodoColor
		 } = this.props;

		let { text } = this.state;

		return (
			<Modal
				isOpen={isOpen}
				onClosed={onClose}
				swipeToClose={true}
				backdropPressToClose={false}
				coverScreen={false}
				position='center'
				backdrop={true}
				animationDuration={200}
				easing={Easing.elastic(0.8)}
			>
				<Container>
					<Content style={{ marginTop: 50 }}>
						<Card>
							<CardItem header>
								<Text>{date}</Text>
							</CardItem>
							<CardItem style={{ backgroundColor: activeColor }}>
								<Body style={styles.body}>
									<Textarea
										style={{ width: responsiveWidth(90) }}
										value={text}
										onChangeText={(text) => {
											this.setState({
												text
											})
											onChangeText(text)
										}} />
								</Body>
							</CardItem>
							<CardItem footer style={styles.footer}>
								{
									colors.map((color) => {
										return (
											<TouchableOpacity onPress={() => { setTodoColor(color) }}>
												<Badge style={[styles.badge, { backgroundColor: color }]} />
											</TouchableOpacity>
										)
									})
								}
							</CardItem>
						</Card>
					</Content>
				</Container>
			</Modal>
		);
	}
}
