import React  from 'react';
import styles from './index.module.css';
import TaskItem from "../taskItem";
import Loader from "../../../loader";
import db from '../../../../firebase';

const DashCell = ({data,loader,err,status,title,updateTasks}) => {

    // useEffect(() => {
    //     const dragZones = document.querySelectorAll(styles.dragZone)
    //     console.log(dragZones)
    //     dragZones.forEach(item => {
    //         item.addEventListener('onDragEnter',handleDragEnter)
    //         item.addEventListener('onDragLeave',handleDragLeave)
    //         item.addEventListener('onDrop',handleDrop)
    //
    //     })
    // }, [])


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




    const  handleDrop = (e) => {
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

    }

    return (

        <div className={styles.cell}>
            <h2> {title} </h2>
            <div className={styles.dragZone}
                 onDragLeave={handleDragLeave}
                 onDragOver={handleDragOver}
                 onDragEnter={handleDragEnter}
                 onDrop={handleDrop}
                 data-name={status}
            >
                {
                    !loader ?
                        !err ?
                            data.map(taskItem => {
                                return <TaskItem key={taskItem.id} data={taskItem}/>
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