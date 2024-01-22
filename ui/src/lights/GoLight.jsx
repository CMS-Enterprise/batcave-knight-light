import {Card} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import api from '../api/axiosConfig';

function GoLight({ goStatus, setGoStatus }){

    async function loadGo() {
        await api.get("/go-api/status/")
            .then(res=> {
                setGoStatus(res.data);
            })
            .catch(err => {
                console.log("error in go endpoint"+ err.toString());
            });
    }

    useEffect(() => {
        loadGo();
    }, []);

    return (
        <Card className="bg-transparent">
            {!goStatus && <img src="public/backend-signals/go-off.svg" alt="Golang Service Offline Indicator"/>}
            {goStatus &&  goStatus.status === "OFF" && <img src="public/backend-signals/go-off.svg" alt="Golang Service Offline Indicator"/>}
            {goStatus &&  goStatus.status === "ON" && <img src="public/backend-signals/go-on.svg" alt="Golang Service Online Indicator"/>}
            
        </Card>
    )
}

export default GoLight;