import React from "react";
import styles from "./index.less";
class AppStart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
                <div className={styles.bottom}></div>
            </div>
        );
    }
}
export default AppStart