import React from 'react';
import Task from 'components/task';
import './style.scss';

const List = ({
    data,
    updateTask,
    removeTask,
}) => (
    <div className="list">
        {data.map(item => {
            return (
                <Task 
                    key={item.id} 
                    data={item}
                    update={updateTask}
                    remove={removeTask}
                />
            )
        })}
    </div>
);

export default List;
