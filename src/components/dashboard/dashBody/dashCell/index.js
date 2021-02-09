import React, {useEffect, useRef , useCallback} from 'react';
import styles from './index.module.css';
import TaskItem from "../taskItem";
import Loader from "../../../loader";
import db from '../../../../firebase';

const DashCell = ({data,loader,err,status,title,updateTasks}) => {
    const dragZoneRef = useRef()

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove(styles.hoveredZone)
    }
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragEnter = e => {
        e.stopPropagation()
        e.preventDefault()

        e.target.classList.add(styles.hoveredZone)
    }




    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove(styles.hoveredZone)
        const currentData = JSON.parse(e.dataTransfer.getData('data'))
        const updatedCurrentData = {
            ...currentData,
            data: {
                ...currentData.data,
                status: status
            }
        }

        updateTasks(updatedCurrentData)

        db.collection('tasks')
            .doc(currentData.id)
            .update({
                status: status
            })
            .finally(() => e.dataTransfer.clearData())

    },[status,updateTasks])



    useEffect(() => {
        const cur = dragZoneRef.current
        if(dragZoneRef.current){
            cur.addEventListener('dragleave',handleDragLeave)
            cur.addEventListener('dragenter',handleDragEnter)
            cur.addEventListener('dragover',handleDragOver)
            cur.addEventListener('drop',handleDrop)
        }
        return () => {
            cur.removeEventListener('dragleave',handleDragLeave)
            cur.removeEventListener('dragenter',handleDragEnter)
            cur.removeEventListener('dragover',handleDragOver)
            cur.removeEventListener('drop',handleDrop)
        }
    }, [ handleDrop ] )




    return (

        <div className={styles.cell}>
            <h2> {title} </h2>
            <div className={styles.dragZone}
                 data-name={status}
                 ref={dragZoneRef}
            >
                {
                    !loader ?
                        !err ?
                            data.map(taskItem => {
                                return <TaskItem key={taskItem.id} data={taskItem} updateTasks={updateTasks}/>
                            })
                            :
                            <p className={styles.pError}>{err}</p>
                        :
                        <Loader/>
                }
            </div>
        </div>
    )
}

export default DashCell;