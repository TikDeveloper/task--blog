import React from 'react';
import styles from "./index.module.css";



const Loader = () => {
    return (

        <div className={styles.loader}>
            <div className={styles.ldsRing}>
                <div> </div>
                <div> </div>
                <div> </div>
                <div> </div>
            </div>
        </div>
    )

}

export default Loader;