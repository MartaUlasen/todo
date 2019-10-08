import React, { Component } from 'react';
import httpService from 'services/http';
import memoizeOne from 'memoize-one';
import { Loader } from 'react-feather';
import List from 'components/list';
import AddTaskForm from 'components/addTaskForm';
import './style.scss';

class Todo extends Component {
    state = {
        tasks: [],
        isLoading: false,
        error: null,
    }

    componentDidMount = () => {
        this.getTasks();
    }

    getTasks = () => {
        this.setState({ isLoading: true });

        httpService.get(`/tasks`)
            .then(({ data }) => {
                const tasks = data;
                this.setState({ tasks });
            })
            .catch((error) => {
                this.setState({ error });
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    updateTask = (id, data) => {
        const { tasks } = this.state;

        const newTasks = tasks.map((item) => {
            if (item.id === id) {
                return { ...data };
            }
            else {
                return item;
            }
        });

        this.setState({
            tasks: newTasks,
        });

        httpService.put(`/tasks/${id}`, data)
            .catch((error) => {
                this.setState({ error });
            })
    }

    addTask = (newTask) => {
        const { tasks } = this.state;

        this.setState({
            tasks: [...tasks, newTask],
        });

        httpService.post(`/tasks`, newTask)
            .catch((error) => {
                this.setState({ error });
            })
    }

    removeTask = (id) => {
        const { tasks } = this.state;
        const newTasks = tasks.filter(task => task.id !== id);

        this.setState({
            tasks: newTasks,
        });

        httpService.delete(`/tasks/${id}`)
            .catch((error) => {
                this.setState({ error });
            });
    }
    
    filterList = memoizeOne((tasks) => {
        const completed = [];
        const uncompleted = [];
        
        tasks.forEach((task) => {
            if (task.completed === 1) {
                completed.push(task);
            }
            else {
                uncompleted.push(task);
            }
        })
        return { completed, uncompleted} ;
    })

    renderError = () => {
        if (this.state.error) {
            return <p>Failed to load todo list data</p>
        }
    }

    render() {
        const { isLoading, tasks } = this.state;
        const lists = this.filterList(tasks);
        const { uncompleted, completed } = lists;

        return (
            <div className="todo">
                {this.renderError()}
                {
                    isLoading
                        ? <Loader className="icon-loading" size={30} />
                        : (
                        <>
                            <AddTaskForm addTask={this.addTask} />
                            <div>
                                <h3>Комментариев в работе: {uncompleted.length} из {tasks.length}</h3>
                                <List 
                                    data={uncompleted}
                                    updateTask={this.updateTask}
                                    removeTask={this.removeTask}
                                />
                            </div>
                            <div>
                                <h3>Выполнено: {completed.length}</h3>
                                <List 
                                    data={completed}
                                    updateTask={this.updateTask}
                                    removeTask={this.removeTask}
                                />
                            </div>
                        </>
                    )
                }
            </div>
        )
    }
}

export default Todo;
