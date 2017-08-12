import React from 'react';
import {
	AsyncStorage
} from 'react-native';
import _ from 'lodash';

class Todos {

	deleteTodoHandler(index, todos) {
		return todos.filter(todo => {
			return todo.index != index
		});
	}

	addNewTodoHandler(todo) {
		let tmp = {};
		tmp['name'] = todo;
		tmp['index'] = todos.length !== 0 ? todos[todos.length - 1].index + 1 : todos.length;
		tmp['checked'] = false;
		return temp;
	}

	checkTodoHandler(index, allTodos) {
		return allTodos.map((todo, i) => {
			if (index === i) {
				allTodos[i].checked = !allTodos[i].checked;
			}
		});
	}


	filterTodosHandler(filterType, allTodos) {
		switch (filterType) {
			case 'Active':
				return allTodos.filter((todo) => {
					return todo.checked == false;
				});
			case 'Completed':
				return allTodos.filter((todo) => {
					return todo.checked == true;
				});
			case 'All':
				return allTodos;
		}
	}


	updateTodosList(todos, newTodos) {
		_.pull(todos, ..._.difference(todos, newTodos));
		todos.push(..._.difference(newTodos, todos));
		return todos;
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

	getSingleTodo(todos, index) {
		return new Promise((resolve, reject) => {
			todos.map((todo, i) => {
				if (todo.index === index) {
					resolve(i);
				}
			})
		})
	}

}

export const todosHelper = new Todos();