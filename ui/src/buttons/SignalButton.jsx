// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './buttons.module.css';

// Local
import api from '../api/axiosConfig';

// 3rd Party
import {Button } from 'reactstrap';

async function setButtonStatus(signalStatus) {
    return await api.get(`${signalStatus}`);
}

function SignalButton( {status, setStatus, language} ) {

    async function toggle() {

        // const result = status.status === 'OFF' ? await setButtonStatus('activate') : await setButtonStatus('deactivate');
        // TODO: Once other endpoints are working use this or some form of this
        const result = status.status === 'OFF' ? setButtonStatus(`${language}-api/activate`) : setButtonStatus(`${language}-api/activate`);
        setStatus(result.data);
    }
    
    return (
        <div className={styles.buttonstyle}>
            <Button outline color="light" size="md" onClick={() => toggle()}>{`Toggle ${language}`}</Button>
        </div>
    )
}

export default SignalButton;