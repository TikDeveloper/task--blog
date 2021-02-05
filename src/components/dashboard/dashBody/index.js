import React from 'react';
import styles from './index.module.css';



const DashBody = () => {


    const handleDragEnter = e => {
        console.log('enter')
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragLeave = e => {
        console.log('leave')
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOver = e => {
        console.log('over')
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = e => {
        console.log('drop')
        e.preventDefault();
        e.stopPropagation();
    };



    return (
        <div className={styles.dragMain}>
            <div className={styles.dragDropZone}
                 onDrop={e => handleDrop(e)}
                 onDragOver={e => handleDragOver(e)}
                 onDragEnter={e => handleDragEnter(e)}
                 onDragLeave={e => handleDragLeave(e)}
            >
                <h2> To Do </h2>
            </div>

            <div className={styles.dragDropZone}
                 onDrop={e => handleDrop(e)}
                 onDragOver={e => handleDragOver(e)}
                 onDragEnter={e => handleDragEnter(e)}
                 onDragLeave={e => handleDragLeave(e)}
            >
                <h2> In Progress </h2>
            </div>

            <div className={styles.dragDropZone}
                 onDrop={e => handleDrop(e)}
                 onDragOver={e => handleDragOver(e)}
                 onDragEnter={e => handleDragEnter(e)}
                 onDragLeave={e => handleDragLeave(e)}
            >
                <h2> Testing </h2>
            </div>

            <div className={styles.dragDropZone}
                 onDrop={e => handleDrop(e)}
                 onDragOver={e => handleDragOver(e)}
                 onDragEnter={e => handleDragEnter(e)}
                 onDragLeave={e => handleDragLeave(e)}
            >
                <h2> Done </h2>
            </div>
        </div>
    )
}

export default DashBody;