import React from 'react';
import styles from './index.module.css';
import DashCell from "./dashCell";

const DashBody = () => {


    return (
        <div className={styles.dragMain}>
            <DashCell title={`To Do`} status={`to--do`}/>
            <DashCell title={`In Progress`} status={`in--progress`}/>
            <DashCell title={`Testing`} status={`testing`}/>
            <DashCell title={`Done`} status={`done`}/>
        </div>
    )
}

export default DashBody;