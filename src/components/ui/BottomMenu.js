'use strict';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import { Footer, Button } from 'native-base';


const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	buttonsBox: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	button: {
		backgroundColor: 'transparent'
	}
})


class BottomMenu extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {}
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	render() {

		let { buttons } = this.props;
		// let { } = this.state;

		return (
			<Footer style={styles.buttonsBox}>
				{
					buttons.map((button) => {
						return (
							<Button style={styles.button}>
								<Text>
									{button}
								</Text>
							</Button>
						)
					})
				}

			</Footer>
		);
	}
}


export default BottomMenu;
