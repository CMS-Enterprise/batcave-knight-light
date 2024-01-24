import './App.css';
import { Row, Col, Card, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CitySilhouette from './footer/CitySilhouette';
import JavaLight from './lights/JavaLight';
import NodeLight from './lights/NodeLight';
import PythonLight from './lights/PythonLight';
import GoLight from './lights/GoLight';
import JavaSignalButton from './buttons/JavaSignalButton';
import { useState } from 'react';
import GoSignalButton from './buttons/GoSignalButton';
import NodeSignalButton from './buttons/NodeSignalButton';
import PythonSignalButton from './buttons/PythonSignalButton';

function App() {
  const [javaStatus, setJavaStatus] = useState([]);
  const [goStatus, setGoStatus] = useState([]);
  const [nodeStatus, setNodeStatus] = useState([]);
  const [pythonStatus, setPythonStatus] = useState([]);

  return (
    <>
      <div data-testid="myapp" className="content">
        <Row className="mb-15">
          <Col>
            <Card className="bg-transparent">
              <img src="public/nightwing.png" alt="Nightwing Logo Banner" />
            </Card>
          </Col>
        </Row>
        <Row className="mb-0">
          <Col xs="3">
            <JavaLight javaStatus={javaStatus} setJavaStatus={setJavaStatus} />
          </Col>
          <Col xs="3">
            <NodeLight nodeStatus={nodeStatus} setNodeStatus={setNodeStatus} />
          </Col>
          <Col xs="3">
            <PythonLight
              pythonStatus={pythonStatus}
              setPythonStatus={setPythonStatus}
            />
          </Col>
          <Col xs="3">
            <GoLight goStatus={goStatus} setGoStatus={setGoStatus} />
          </Col>
        </Row>
        <Row className="mt-n14">
          <Col>
            <CitySilhouette />
          </Col>
        </Row>
        <Row className="buttons">
          <Col xs="3">
            <JavaSignalButton
              javaStatus={javaStatus}
              setJavaStatus={setJavaStatus}
            />
          </Col>
          <Col xs="3">
            <NodeSignalButton
              nodeStatus={nodeStatus}
              setNodeStatus={setNodeStatus}
            />
          </Col>
          <Col xs="3">
            <PythonSignalButton
              pythonStatus={pythonStatus}
              setPythonStatus={setPythonStatus}
            />
          </Col>
          <Col xs="3">
            <GoSignalButton goStatus={goStatus} setGoStatus={setGoStatus} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;
