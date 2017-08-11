'use strict';
import React, { Component } from 'react';
import {
	View,
	Text,
	AsyncStorage,
	ListView
} from 'react-native';
import { styles } from './style';

import BottomMenu from '@ui/BottomMenu';
import Todos from '@ui/Todos';
import Todo from "@ui/Todo";
import Input from "@ui/Input";
import {
	footerButtonsArray
} from '@config/config';
import { Container, Header } from 'native-base';

const buttons = footerButtonsArray
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


export default class Main extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			todos: [],
			filteredTodos: []
		}
	}

	componentWillMount() {
		this.getTodosFromStorage()
			.then((res) => {
				let todos = JSON.parse(res);
				if (Array.isArray(todos)) {
					this.setState({ todos: todos, filteredTodos: todos })
				}
			});
		// this.removeTodoFromStorage();
	}


	renderRow(data, rowId, index) {
		return (
			<Todo
				itemName={data.name}
				finished={data.checked}
				handleIconPress={() => this.checkTodo(data.index)}
				deleteTodo={() => { this.deleteTodo(data.index) }}
			/>
		)
	}

	render() {

		// let { } = this.props;
		let {
			todos,
			filteredTodos
		} = this.state;

		return (
			<View style={styles.mainContainer}>
				<Header />
				<Container
					style={styles.subContainer}
				>
					<Input addNewTodo={(value) => this.addNewTodo(value)} />
					<Todos
						renderRow={(data, rowId, index) => this.renderRow(data, rowId, index)}
						todos={ds.cloneWithRows(filteredTodos)}
					/>
				</Container>
				<BottomMenu buttons={buttons} handleClick={(filterType) => this.handleFilter(filterType)} />
			</View>
		);
	}

	handleFilter(filterType) {
		let filteredTodos = this.filterTodos(filterType);
		this.setState({
			filteredTodos
		})
	}


	deleteTodo(index) {
		let { todos } = this.state;
		todos = todos.filter(todo => {
			return todo.index != index
		});
		this.setState({ filteredTodos: todos }, this.addTodosToStorage(todos))
	}

	addNewTodo(todo) {
		let todos = this.state.todos;
		let tmp = {};

		tmp['name'] = todo;
		tmp['index'] = todos.length;
		tmp['checked'] = false;
		console.log(todos);
		todos.push(tmp);

		this.setState({
			todos: todos
		}, () => {
			this.addTodosToStorage(this.state.todos);
		})
	}

	checkTodo(index) {
		let { todos } = this.state;
		todos.map((todo, i) => {
			if (index === i) {
				todos[i].checked = !todos[i].checked;
			}
		});

		this.setState({
			todos: todos
		}, () => {
			this.addTodosToStorage(this.state.todos);
		});
	}

	addTodosToStorage(todos) {
		AsyncStorage.setItem('todos', JSON.stringify(todos));
	}

	removeTodoFromStorage() {
		AsyncStorage.removeItem('todos');
	}

	getTodosFromStorage() {
		return AsyncStorage.getItem('todos');
	}

	filterTodos(filterType) {
		let { todos } = this.state;

		switch (filterType) {
			case 'Active':
				return todos.filter((todo) => {
					return todo.checked == false;
				});
			case 'Completed':
				return todos.filter((todo) => {
					return todo.checked == true;
				});
			case 'All':
				return todos;
		}
	}



}
