import { Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import api from '../api/axiosConfig';

function NodeLight({ nodeStatus, setNodeStatus }) {
  async function loadNode() {
    try {
      const response = await api.get('/nodejs-api/');
      setNodeStatus(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadNode();
  }, []);

  return (
    <Card className="bg-transparent">
      {!nodeStatus && (
        <img
          src="public/backend-signals/node-off.svg"
          alt="Node Service Offline Indicator"
        />
      )}
      {nodeStatus && nodeStatus.status === 'OFF' && (
        <img
          src="public/backend-signals/node-off.svg"
          alt="Node Service Offline Indicator"
        />
      )}
      {nodeStatus && nodeStatus.status === 'ON' && (
        <img
          src="public/backend-signals/node-on.svg"
          alt="Node Service Online Indicator"
        />
      )}
    </Card>
  );
}

export default NodeLight;
