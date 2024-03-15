const request = require("supertest");
const app = require('./index.js');

const version = "v1.0.0";

describe('Post endpoint to deactivate server', () => {
    it('should return {"server": "nodeJS", "status": "OFF", version: '+ version + '}', async () => {
        const res = await request(app)
            .post('/deactivate')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({"server": "nodeJS", "status": "OFF", "version": version })
    });
});

describe('Post endpoint to activate server', () => {
    it('should return {"server": "nodeJS", "status": "ON", version: '+ version + '}', async () => {
        const res = await request(app)
            .post('/activate')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({"server": "nodeJS", "status": "ON", "version": version })
    });
});

describe('Get endpoint to get status of server', () => {
    it('should return {"server": "nodeJS", "status": "ON", version: '+ version + '}', async () => {
        const res = await request(app)
            .get('/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({"server": "nodeJS", "status": "ON", "version":  version })
    });
});

afterAll( async () => {
    console.log("...Test Ended");
    app.close();
});