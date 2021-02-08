import React, {useState,useEffect} from 'react';
import styles from './index.module.css';
import DashCell from "./dashCell";
import db from "../../../firebase";

const DashBody = () => {
    const cells = [
        {
            title: 'To Do',
            status: 'to--do'
        },
        {
            title: 'In Progress',
            status: 'in--progress'
        },
        {
            title: 'Testing',
            status: 'testing'
        },
        {
            title: 'Done',
            status: 'done'
        }

    ]
    const [tasks,setTasks] = useState( [ ] )
    const [loader,setLoader] = useState(true)
    const [err,setErr] = useState()


    useEffect(() => {
        getDataFirestore()
    }, [ ] )




    const getDataFirestore = () => {
        db.collection('tasks')
            .orderBy('timestamp','desc')
            .get()
            .then(snapshot => {
                const x = []
                snapshot.forEach(doc => {
                    x.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                setTasks(x)
            })
            .finally(() => setLoader(false))
            .catch(err => setErr(err.message))
    }


    const updateTasks = (currentData) => {
        const filteredTasks = tasks.filter(item => item.id !== currentData.id)
        setTasks(prev => {
            return [
                ...filteredTasks,
                currentData
            ]
        })
    }




    return (
        <div className={styles.dragMain}>
            {cells.map((cell,i) => {
                return <DashCell
                    key={i}
                    title={cell.title}
                    status={cell.status}
                    data={tasks.filter( item => item.data.status === cell.status)}
                    loader={loader}
                    err={err}
                    updateTasks={updateTasks}
                />
            })}

        </div>
    )
}

export default DashBody;