const express = require('express');
const app = express();
app.use(express.json());
module.exports = app.listen(3000);

const statusON = "ON";
const statusOFF = "OFF";
const versionNum = "v1.0.0";
const PORT = process.env.PORT || 3000;

var serverStatus = statusON;
var serverType = "nodeJS";
var serverVersion = versionNum;

var response = {
    status: serverStatus,
    server: serverType,
    version: serverVersion
};

app.get('/', (req, res) => {
    res.json(response);
});

app.post('/deactivate', (req, res) => {
    response.status = statusOFF;
    res.json(response);
});

app.post('/activate', (req, res) => {
    response.status = statusON;
    res.json(response);
});

/* poopie ignore next */
// if(process.env.NODE_ENV !== 'test'){
//     app.listen(PORT, () => {
//         console.log('Listening on port 3000');
//     });
// }