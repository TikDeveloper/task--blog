import React from 'react';
import styles from './index.module.css';



const TaskItem = ({data}) =>{

    const handlerDragStart = e => {
        setTimeout(() => {
            e.target.classList.add(styles.hideItem)
        },0)
        e.dataTransfer.setData('data',JSON.stringify(data))
    }
    const handlerDragEnd = e => {
        setTimeout(() => {
            e.target.classList.remove(styles.hideItem)
        },0)
    }






    return(
        <div
            id="taskItem"
            className={styles.taskItem}
            draggable={true}
            onDragStart={handlerDragStart}
            onDragEnd={handlerDragEnd}
        >
            {data.data.title}
        </div>
    )
}

export default TaskItem;