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
import { Container } from 'native-base';
import Header from "@ui/Header";
import DialogBox from 'react-native-dialogbox';
import TodoDetails from '@ui/TodoDetails';
import { todosHelper } from "@lib/todos";
import moment from 'moment';


const buttons = footerButtonsArray
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
let date = new Date();
const now = moment().format('DD MMM - HH:mm a');

export default class Main extends Component {

	constructor(props, context) {
		super(props, context);
		this.allTodos = [];
		this.state = {
			todos: [],
			filterType: 'All',
			openTodoDetails: false,
			clickedTodo: null,
			currentSelectedTodo: {}
		}
	}

	componentWillMount() {
		todosHelper.getTodosFromStorage()
			.then((res) => {
				let todos = JSON.parse(res);
				if (Array.isArray(todos)) {
					this.allTodos = todos;
					this.setState({ todos: todos })
				}
			});
		// todosHelper.removeTodoFromStorage();
	}

	componentDidMount() {
		// todosHelper.removeTodoFromStorage();
	}

	renderRow(data, rowId, index) {
		return (
			<Todo
				itemName={data.name}
				finished={data.checked}
				handleIconPress={() => this.checkTodo(data.index)}
				deleteTodo={() => { this.handleTodoLongPress(data.index) }}
				onPress={() => this.openTodoDetails(index)}
			/>
		)
	}

	render() {

		let {
			todos,
			openTodoDetails,
			currentSelectedTodo
		} = this.state;

		return (
			<View style={styles.mainContainer}>
				<Header
					title="ToDo App" />
				<Container
					style={styles.subContainer} >
					<Input
						addNewTodo={(value) => this.addNewTodo(value)} />
					<Todos
						renderRow={(data, rowId, index) => this.renderRow(data, rowId, index)}
						todos={ds.cloneWithRows(todos)}
					/>
				</Container>
				<BottomMenu
					buttons={buttons}
					handleClick={(filterType) => this.handleFilter(filterType)} />
				<DialogBox
					ref={dialogbox => { this.dialogbox = dialogbox }} />
				<TodoDetails
					onChangeText={(text) => {
						this.updateTodo(text);
					}}
					date={"date" in currentSelectedTodo ? currentSelectedTodo.date : ""}
					todoText={"name" in currentSelectedTodo ? currentSelectedTodo.name : ""}
					isOpen={openTodoDetails}
					onClose={() => this.onCloseTodoDetails()} />
			</View>
		);
	}

	handleFilter(filterType) {
		let filteredTodos = this.filterTodos(filterType, this.allTodos);
		this.setState({
			todos: filteredTodos
		})
	}

	handleTodoLongPress(index) {
		this.dialogbox.confirm({
			title: 'Delete Todo?',
			content: ['Are you sure?'],
			ok: {
				text: 'Ok',
				style: {
					color: 'red'
				},
				callback: () => {
					this.deleteTodo(index);
				},
			},
			cancel: {
				text: 'Cancel',
				style: {
					color: 'blue'
				}
			},
		});
	}

	deleteTodo(index) {
		let { filterType } = this.state;
		let { allTodos } = this;
		let todos = todosHelper.deleteTodoHandler(index, allTodos);
		this.allTodos = todos;
		this.setState({
			todos: this.filterTodos(filterType, todos)
		}, todosHelper.addTodosToStorage(todos))
	}

	addNewTodo(todo) {
		let { todos, filterType } = this.state;
		let { allTodos } = this;
		let tmp = {};

		tmp['name'] = todo;
		tmp['index'] = todos.length !== 0 ? todos[todos.length - 1].index + 1 : todos.length;
		tmp['checked'] = false;
		tmp['date'] = now;
		allTodos.push(tmp);

		this.setState({
			todos: this.filterTodos(filterType, allTodos)
		}, () => {
			todosHelper.addTodosToStorage(allTodos);
		})
	}

	checkTodo(index) {
		let { filterType } = this.state;
		let todos = this.allTodos;
		todos[index].checked = !todos[index].checked;
		this.allTodos = todos;
		this.setState({
			todos: this.filterTodos(filterType, todos)
		}, () => {
			todosHelper.addTodosToStorage(todos);
		});
	}

	filterTodos(filterType, todos) {
		this.setState({ filterType });
		return todosHelper.filterTodosHandler(filterType, todos);
	}

	onCloseTodoDetails() {
		this.setState({ openTodoDetails: false })
	}

	openTodoDetails(index) {
		this.setState({ openTodoDetails: true, currentSelectedTodo: this.state.todos[index] })
	}

	updateTodo(text) {
		let todos = this.allTodos;
		let { currentSelectedTodo, filterType } = this.state;
		console.log(currentSelectedTodo);
		todos[currentSelectedTodo.index]['name'] = text;
		todos[currentSelectedTodo.index]['date'] = now;
		this.allTodos = todos;
		this.setState(
			{
				currentSelectedTodo,
				todos: this.filterTodos(filterType, this.allTodos)
			},
			() => todosHelper.addTodosToStorage(todos)
		)
	}


}
