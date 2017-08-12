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
		this.allTodos = [];
		this.state = {
			todos: []
		}
	}

	componentWillMount() {
		this.getTodosFromStorage()
			.then((res) => {
				let todos = JSON.parse(res);
				if (Array.isArray(todos)) {
					this.allTodos = todos;
					this.setState({ todos: todos })
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

		let {
			todos,
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
						todos={ds.cloneWithRows(todos)}
					/>
				</Container>
				<BottomMenu buttons={buttons} handleClick={(filterType) => this.handleFilter(filterType)} />
			</View>
		);
	}

	handleFilter(filterType) {
		let filteredTodos = this.filterTodos(filterType);
		console.log(filteredTodos)
		this.setState({
			todos: filteredTodos
		})
	}


	deleteTodo(index) {
		let { todos } = this.state;
		todos = todos.filter(todo => {
			return todo.index != index
		});
		this.allTodos = todos;
		this.setState({ todos: todos }, this.addTodosToStorage(todos))
	}

	addNewTodo(todo) {
		let todos = this.state.todos;
		let tmp = {};

		tmp['name'] = todo;
		tmp['index'] = todos.length !== 0 ? todos[todos.length - 1].index + 1 : todos.length;
		tmp['checked'] = false;
		// console.log(todos);
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
				console.log(todo)
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
				return this.allTodos.filter((todo) => {
					return todo.checked == false;
				});
			case 'Completed':
				return this.allTodos.filter((todo) => {
					return todo.checked == true;
				});
			case 'All':
				return this.allTodos;
			default:
				return todos;
		}
	}



}
