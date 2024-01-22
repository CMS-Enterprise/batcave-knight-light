import {Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./buttons.module.css";
import api from '../api/axiosConfig';

function JavaSignalButton( {javaStatus, setJavaStatus} ) {

    async function toggleJava() {
        if(javaStatus.status === "OFF"){
            const Result = await api.get("/java-api/activate");
            setJavaStatus(Result.data);
        }
        else{
            const Result = await api.get("/java-api/deactivate");
            setJavaStatus(Result.data);
        }
    }
    return (
        <div className={styles.buttonstyle}>
            <Button outline color="light" size="md" onClick={() => toggleJava()}>Toggle Java</Button>
        </div>
    )
}

export default JavaSignalButton;