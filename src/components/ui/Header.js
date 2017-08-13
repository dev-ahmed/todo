import React, { Component } from 'react';
import {

} from 'react-native';
import {
	Header,
	Item,
	Text,
	Button
} from 'native-base';

class CustomHeader extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { activeItems } = this.props;

		return (
			<Header>
				<Item>
					{
						activeItems > 0 ? <Text> {activeItems} Item left </Text> : null
					}

				</Item>
			</Header>
		)
	}

}

export default CustomHeader;