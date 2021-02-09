import React, { useState, useRef } from 'react';
import styles from './index.module.css';
import db from '../../../../firebase';
import Loader from "../../../loader";


const TaskItem = ( { data, updateTasks } ) => {
    const taskItemRef = useRef()
    const [editInpVal,setEditInpVal] = useState(data.data.title)
    const [editInpOpen,setEditInpOpen] = useState(false)
    const [loader,setloader] = useState(false)


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

    const handleDeleteClick = e => {
        const currentTaskItem = taskItemRef.current
        currentTaskItem.classList.add(styles.hideItem)

        db.collection('tasks')
            .doc( data.id )
            .delete()
            .then( () => console.log('Item is Deleted !!!') )
            .catch( err => console.error(err.message) )
    }

    const handleEditClick = e => {
        setEditInpOpen(prev => {
            return !prev
        })
    }

    const handleUpdateClick = e => {
        setloader(true)
        const updatedCurrentData = {
            ...data,
            data: {
                ...data.data,
                title: editInpVal
            }
        }

        updateTasks(updatedCurrentData)

        db.collection('tasks')
            .doc( data.id )
            .update({
                title: editInpVal
            })
            .finally(() => {
                setEditInpVal('')
                setloader(false)
            })
    }



    return(

        <div
            id="taskItem"
            className={styles.taskItem}
            draggable={true}
            onDragStart={handlerDragStart}
            onDragEnd={handlerDragEnd}
            data-id={data.id}
            ref={taskItemRef}
        >
            {data.data.title}
            <div className={styles.taskDelEdit} >
                <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" onClick={handleDeleteClick}>
                    <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336"/>
                    <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/>
                </svg>
                <svg width="16" height="16"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"  onClick={handleEditClick}>
                    <path d="M149.996,0C67.157,0,0.001,67.161,0.001,149.997S67.157,300,149.996,300s150.003-67.163,150.003-150.003 S232.835,0,149.996,0z M221.302,107.945l-14.247,14.247l-29.001-28.999l-11.002,11.002l29.001,29.001l-71.132,71.126 l-28.999-28.996L84.92,186.328l28.999,28.999l-7.088,7.088l-0.135-0.135c-0.786,1.294-2.064,2.238-3.582,2.575l-27.043,6.03 c-0.405,0.091-0.817,0.135-1.224,0.135c-1.476,0-2.91-0.581-3.973-1.647c-1.364-1.359-1.932-3.322-1.512-5.203l6.027-27.035 c0.34-1.517,1.286-2.798,2.578-3.582l-0.137-0.137L192.3,78.941c1.678-1.675,4.404-1.675,6.082,0.005l22.922,22.917 C222.982,103.541,222.982,106.267,221.302,107.945z" fill="#2BA114"/>
                </svg>
            </div>
            {
                editInpOpen && (
                    <div>
                        <input type='text'
                               className={styles.editInp}
                               value={editInpVal}
                               onChange={ e => setEditInpVal(e.target.value) }
                               placeholder="Task Title"
                        />
                        <button type='button'
                                className={styles.updateBtn}
                                onClick={handleUpdateClick}
                        >
                            Update
                        </button>
                    </div>
                )
            }
            {loader ? <Loader/> : null}
        </div>
    )
}

export default TaskItem;