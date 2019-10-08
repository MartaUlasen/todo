import React, { Component } from 'react';
import { X } from 'react-feather';
import './style.scss';

class Task extends Component {
    updateHandler = () => {
        const { update, data } = this.props;
        const newData = {
            ...data,
            completed: data.completed === 0 ? 1 : 0,
        };
        update(data.id, newData)
    }

    removeHandler = () => {
        const { remove, data} = this.props;
        remove(data.id)
    }
    
    render() {
        const { data } = this.props;

        return (
            <div className="list__item">
                <label className="checkbox-label">
                    <input 
                        className="input-checkbox"
                        type="checkbox"
                        onChange={this.updateHandler}
                        checked={data.completed}
                    />
					<span className="checkmark"></span>
                    <span>{data.name}</span>
				</label>
                <button 
                    type="button" 
                    className="btn"
                    onClick={this.removeHandler}
                >
                    <X className="icon-close" size={14} />
                </button>
            </div>
        );
    }
}

export default Task;
