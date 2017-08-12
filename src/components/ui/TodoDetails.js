'use strict';
import React, { Component } from 'react';
import {
	View,
	Easing
} from 'react-native'
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Text,
	Body,
	Textarea
} from 'native-base';
import { responsiveWidth } from 'react-native-responsive-dimensions'

import Modal from 'react-native-modalbox';

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
			date
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
					{/*<Header />*/}
					<Content>
						<Card>
							<CardItem header>
								<Text>{date}</Text>
							</CardItem>
							<CardItem>
								<Body>
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
							{/*<CardItem footer>
								<Text>GeekyAnts</Text>
							</CardItem>*/}
						</Card>
					</Content>
				</Container>
			</Modal>
		);
	}
}
