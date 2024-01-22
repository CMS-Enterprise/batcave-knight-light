import {Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./buttons.module.css";
import api from '../api/axiosConfig';

function PythonSignalButton( {pythonStatus, setPythonStatus} ) {

    async function togglePython() {
        if(pythonStatus.status === "OFF"){
            const Result = await api.get("/flask-api/activate");
            setPythonStatus(Result.data);
        }
        else{
            const Result = await api.get("/flask-api/deactivate");
            setPythonStatus(Result.data);
        }
    }
    return (
        <div className={styles.buttonstyle}>
            <Button outline color="light" size="md" onClick={() => togglePython()}>Toggle Python</Button>
        </div>
    )
}

export default PythonSignalButton;