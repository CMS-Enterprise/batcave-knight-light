import pytest
from src.app import app


@pytest.fixture(name="mock_client")
def client():
    app.config["TESTING"] = True
    with app.test_client() as tclient:
        yield tclient


def test_index(mock_client):
    response = mock_client.get("/")
    assert response.status_code == 200
    assert response.json == {
        "status": "OFF",
        "server": "python flask",
        "version": "1.0.0",
    }


def test_status(mock_client):
    response = mock_client.get("/status")
    assert response.status_code == 200
    assert response.json == {
        "status": "OFF",
        "server": "python flask",
        "version": "1.0.0",
    }


def test_activate(mock_client):
    response = mock_client.post("/activate")
    assert response.status_code == 200
    assert response.json == {
        "status": "ON",
        "server": "python flask",
        "version": "1.0.0",
    }


def test_deactivate(mock_client):
    # Activate first to make sure we can deactivate
    mock_client.post("/activate")
    response = mock_client.post("/deactivate")
    assert response.status_code == 200
    assert response.json == {
        "status": "OFF",
        "server": "python flask",
        "version": "1.0.0",
    }
