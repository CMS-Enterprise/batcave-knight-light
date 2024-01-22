from flask import Flask, jsonify

#Creating Flask App
app = Flask(__name__)

#Creating Data Schema
status = { "status": "OFF", "server": "python flask", "version": "1.0.0" }

#Return current status of signal
@app.route('/', methods=['GET'])
@app.route('/status', methods=['GET'])
def index():
    return jsonify(status)

#Turn status on
@app.route('/activate', methods = ['POST'])
def activate():
    status["status"]= "ON"
    return jsonify(status)

#Turn status off
@app.route('/deactivate', methods = ['POST'])
def deactivate():
    status["status"]= "OFF"
    return jsonify(status)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
