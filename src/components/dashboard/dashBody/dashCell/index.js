import React, {useState,useEffect} from 'react';
import styles from './index.module.css';
import TaskItem from "../taskItem";
import Loader from "../../../loader";
import db from '../../../../firebase';

const DashCell = ({title,status}) => {
    const [tasks,setTasks] = useState( [] )
    const [loader,setLoader] = useState(true)
    const [err,setErr] = useState()
    // const [filteredData,setFilteredData] = useState()

    useEffect(() => {
        const x = []
        db.collection('tasks')
            .orderBy('timestamp','desc')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    x.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
            })
            .then(() => {
                setTasks(x)
            })
            .finally(() => setLoader(false))
            .catch(err => setErr(err.message))



    }, [])


    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove(styles.hoveredZone)
    }

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add(styles.hoveredZone)
    }

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove(styles.hoveredZone)
        const currentData = JSON.parse(e.dataTransfer.getData('data'))


        db.collection('tasks')
            .doc(currentData.id)
            .update({
                status: e.target.getAttribute("data-name")
            })
            // .then(SOME WORK TO DOOOOO)
            .then(() => {
                const status = e.target.getAttribute("data-name")
                const filteredTasks = tasks.filter(item => item.id !== currentData.id).filter(item => item.data.status === status)

                // setFilteredData(filteredTasks)
            })
            .finally(() => e.dataTransfer.clearData())

    }


    return (

        <div className={styles.cell}>
            <h2> {title} </h2>
            <div className={styles.dragZone}
                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
                 onDragEnter={handleDragEnter}
                 onDrop={handleDrop}
                 data-name={status}
            >
                {/*{*/}
                {/*    filteredData ?*/}
                {/*        filteredData.map(item => {*/}
                {/*            return <TaskItem key={item.id} data={item}/>*/}
                {/*        })*/}
                {/*        :*/}
                {/*        null*/}
                {/*}*/}
                {
                    !loader ?

                        !err ?
                            tasks.filter(taskItem => taskItem.data.status === status).map(taskItem => {
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