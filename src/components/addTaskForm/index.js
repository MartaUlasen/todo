import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import './style.scss';

function Task() {
    this.id = uuidv4();
    this.name = '';
    this.user_id = 1;
    this.parent_id = 7;
    this.completed = 0;
}

class AddTaskForm extends Component {
    state = new Task()

    handleChange = (event) => {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmit = (event) => {
        const { addTask } = this.props;

        addTask(this.state);

        this.setState(new Task());

        event.preventDefault();
    }

    render() {
        const { name } = this.state;

        return (
            <form 
                className="form" 
                onSubmit={this.handleSubmit} 
                action="#"
            >
                <input 
                    className="form__input"
                    type="text"
                    value={name}
                    minLength="3"
                    required
                    onChange={this.handleChange} 
                />
                <button 
                    type="submit"
                    className="form__btn"
                >
                    Добавить комментарий
                </button>
            </form>
        );
    }
}

export default AddTaskForm;
