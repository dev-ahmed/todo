import React, { Component } from 'react';
import {

} from 'react-native';
import {
    Header,
    Item,
    Text
} from 'native-base';

class CustomHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let { title } = this.props;

        return (
            <Header>
                <Item>
                    <Text > {title} </Text>
                </Item>
            </Header>
        )
    }

}

export default CustomHeader;