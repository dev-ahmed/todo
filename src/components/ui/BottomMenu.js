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
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10,
	},
	button: {
		alignSelf: 'center',
		height: 40
		// backgroundColor: 'transparent'
	}
})


class BottomMenu extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			activeButton: 'All'
		}
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	render() {

		let { buttons, handleClick, active } = this.props;
		// let { } = this.state;

		return (
			<Footer style={styles.buttonsBox}>
				{
					buttons.map((button) => {
						return (
							<Button
								rounded
								success={this.state.activeButton == button}
								onPress={
									() => {
										handleClick(button)
										this.setState({ activeButton: button })
									}}
								style={styles.button}>
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
