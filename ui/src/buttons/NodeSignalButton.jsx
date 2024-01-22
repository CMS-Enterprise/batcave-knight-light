import {Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./buttons.module.css";
import api from '../api/axiosConfig';

function NodeSignalButton( {nodeStatus, setNodeStatus} ) {

    async function toggleNode() {
        if(nodeStatus.status === "OFF"){
            const Result = await api.get("/nodejs-api/activate");
            setNodeStatus(Result.data);
        }
        else{
            const Result = await api.get("/nodejs-api/deactivate");
            setNodeStatus(Result.data);
        }
    }
    return (
        <div className={styles.buttonstyle}>
            <Button outline color="light" size="md" onClick={() => toggleNode()}>Toggle NodeJS</Button>
        </div>
    )
}

export default NodeSignalButton;