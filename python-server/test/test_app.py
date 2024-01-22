import json

def test_get_status(client):
    res = client.get('/')
    assert res.status_code == 200
    expected = { "status": "OFF", "server": "python flask", "version": "1.0.0" }
    assert expected == json.loads(res.get_data(as_text=True))

    res = client.get('/status')
    assert res.status_code == 200
    expected = { "status": "OFF", "server": "python flask", "version": "1.0.0" }
    assert expected == json.loads(res.get_data(as_text=True))

def test_activate(client):
    res = client.post('/activate')
    assert res.status_code == 200
    expected = { "status": "ON", "server": "python flask", "version": "1.0.0" }
    assert expected == json.loads(res.get_data(as_text=True))

def test_deactivate(client):
    res = client.post('/deactivate')
    assert res.status_code == 200
    expected = { "status": "OFF", "server": "python flask", "version": "1.0.0" }
    assert expected == json.loads(res.get_data(as_text=True))
