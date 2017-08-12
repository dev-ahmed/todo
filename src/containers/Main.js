'use strict';
import React, { Component } from 'react';
import {
	View,
	Text,
	AsyncStorage,
	ListView,
	ScrollView,
	BackAndroid
} from 'react-native';
import { styles } from './style';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import AndroidBackButton from "react-native-android-back-button"

import {
	ListItem,
	Item,
	List,
	Content
} from 'native-base';
import _ from 'lodash';

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
		this.counter = 0;
		this.handleBackButton();
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
				item={data}
				handleIconPress={() => this.checkTodo(data.index)}
				deleteTodo={() => { this.handleTodoLongPress(data.index) }}
				onPress={() => this.openTodoDetails(data.index)}
			/>
		)
	}

	render() {

		let {
			todos,
			openTodoDetails,
			currentSelectedTodo
		} = this.state;
		let groupingTodos = _.groupBy(todos, todo => todo.name[0]);

		return (
			<View style={styles.mainContainer}>
				<Header
					title="ToDo App" />
				<Container
					style={styles.subContainer} >
					<Input
						addNewTodo={(value) => this.addNewTodo(value)} />
					<ScrollView>
						{
							Object.keys(groupingTodos).sort().map((key) => {
								return (
									<Content >
										<ListItem itemDivider style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
											<Item style={{ alignItems: 'center', justifyContent: 'center' }} >
												<Text>	{key.toUpperCase()} </Text>
											</Item>
										</ListItem>
										<Todos
											renderRow={(data, rowId, index) => this.renderRow(data, rowId, index)}
											todos={ds.cloneWithRows(groupingTodos[key])}
										/>
									</Content>
								)
							})
						}
					</ScrollView>

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

	handleBackButton() {
		BackAndroid.addEventListener("hardwareBackPress", () => {
			this.counter++

			if (this.state.openTodoDetails) {
				this.setState({ openTodoDetails: false })
				return true;
			} else {
				return false;
			}
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
		this.allTodos = todosHelper.deleteTodoHandler(index, this.allTodos);
		this.setState({
			todos: this.filterTodos(filterType, this.allTodos)
		}, () => {
			todosHelper.addTodosToStorage(this.allTodos)
		})
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
		console.log(allTodos)
		this.setState({
			todos: this.filterTodos(filterType, allTodos)
		}, () => {
			todosHelper.addTodosToStorage(allTodos);
		})
	}

	checkTodo(index) {
		let { filterType } = this.state;
		let todos = this.allTodos;

		todosHelper.getSingleTodo(this.allTodos, index)
			.then((i) => {
				todos[i].checked = !todos[i].checked;
				this.allTodos = todos;
				this.setState({
					todos: this.filterTodos(filterType, todos)
				}, () => {
					todosHelper.addTodosToStorage(todos);
				});
			})
	}

	filterTodos(filterType, todos) {
		this.setState({ filterType });
		return todosHelper.filterTodosHandler(filterType, todos);
	}

	onCloseTodoDetails() {
		this.setState({ openTodoDetails: false })
	}

	openTodoDetails(index) {
		todosHelper.getSingleTodo(this.allTodos, index)
			.then((i) => {
				this.setState({ openTodoDetails: true, currentSelectedTodo: this.allTodos[i] })
			})
	}

	updateTodo(text) {
		let todos = this.allTodos;
		let { currentSelectedTodo, filterType } = this.state;

		todosHelper.getSingleTodo(this.allTodos, currentSelectedTodo.index)
			.then((i) => {
				todos[i]['name'] = text;
				todos[i]['date'] = now;
				this.allTodos = todos;
				this.setState({
					currentSelectedTodo,
					todos: this.filterTodos(filterType, this.allTodos)
				},
					() => todosHelper.addTodosToStorage(todos)
				)
			})
	}


}
