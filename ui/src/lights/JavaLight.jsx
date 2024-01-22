import {Card} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import api from '../api/axiosConfig';

function JavaLight({javaStatus, setJavaStatus}) {

    async function loadJava() {
       await api.get("/java-api/")
                .then(res=> {
                    setJavaStatus(res.data);
                })
                .catch(err => {
                     console.log("error in Java endpoint"+ err.toString());
                });
    }

    useEffect(() => {
        loadJava();
    }, []);

    return (
        <Card className="bg-transparent">
            {!javaStatus && <img src="public/backend-signals/java-off.svg" alt="Java Service Offline Indicator"/>}
            {javaStatus &&  javaStatus.status === "OFF" && <img src="public/backend-signals/java-off.svg" alt="Java Service Offline Indicator"/>}
            {javaStatus &&  javaStatus.status === "ON" && <img src="public/backend-signals/java-on.svg" alt="Java Service Online Indicator"/>}
            
        </Card>
    )
}

export default JavaLight;