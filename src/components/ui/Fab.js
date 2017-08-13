'use strict';
import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native'

import {
	Content,
	Fab,
	Icon,
	Button
} from 'native-base'


export default class FabCustom extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			active: false
		}
	}

	render() {

		let {
			clearCompleted,
		} = this.props;

		return (
			<Fab
				active={this.state.active}
				direction="up"
				containerStyle={{ bottom: 30 }}
				position="bottomRight"
				onPress={() => this.setState({ active: !this.state.active })}
			>
				<Icon name="md-more" />
				<Button
					onPress={() => clearCompleted()}
					style={{ backgroundColor: '#3B5998' }}>
					<Icon name="md-trash" />
				</Button>
			</Fab>
		);
	}
}
