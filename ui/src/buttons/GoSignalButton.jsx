import {Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './buttons.module.css';
import api from '../api/axiosConfig';

function GoSignalButton( {goStatus, setGoStatus} ) {

    async function toggleGo() {
        if(goStatus.status === "OFF"){
            const Result = await api.get("/go-api/activate");
            setGoStatus(Result.data);
        }
        else{
            const Result = await api.get("/go-api/deactivate");
            setGoStatus(Result.data);
        }
    }
    return (
        <div className={styles.buttonstyle}>
            <Button outline color="light" size="md" onClick={() => toggleGo()}>Toggle Go</Button>
        </div>
    )
}

export default GoSignalButton;