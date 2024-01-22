import {Card} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import api from '../api/axiosConfig';

function PythonLight({pythonStatus, setPythonStatus}) {

    async function loadPython() {
        await api.get("/flask-api/")
        .then(res=> {
             setPythonStatus(res.data);
        })
        .catch(err => {
            console.log("error in python endpoint"+ err.toString());
        });
    }

    useEffect(() => {
        loadPython();
    }, []);

    return (
        <Card className="bg-transparent">
            {!pythonStatus && <img src="public/backend-signals/python-off.svg" alt="Python Service Offline Indicator"/>}
            {pythonStatus &&  pythonStatus.status === "OFF" && <img src="public/backend-signals/python-off.svg" alt="Python Service Offline Indicator"/>}
            {pythonStatus &&  pythonStatus.status === "ON" && <img src="public/backend-signals/python-on.svg" alt="Python Service Offline Indicator"/>}
            
        </Card>
    )
}

export default PythonLight;