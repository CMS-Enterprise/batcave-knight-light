import {Card} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import api from '../api/axiosConfig';

function NodeLight( { nodeStatus, setNodeStatus} ){

    async function loadNode() {
        await api.get("/nodejs-api/")
                .then(res=> {
            setNodeStatus(res.data);
        })
        .catch(err => {
            console.log("error in nodeJS endpoint"+ err.toString());
        });
            
    }

    useEffect(() => {
        loadNode();
    }, []);

    return (
        <Card className="bg-transparent">
            {!nodeStatus && <img src="public/backend-signals/node-off.svg" alt="Node Service Offline Indicator"/>}
            {nodeStatus &&  nodeStatus.status === "OFF" && <img src="public/backend-signals/node-off.svg" alt="Node Service Offline Indicator"/>}
            {nodeStatus &&  nodeStatus.status === "ON" && <img src="public/backend-signals/node-on.svg" alt="Node Service Online Indicator"/>}
            
        </Card>
    )
}

export default NodeLight;