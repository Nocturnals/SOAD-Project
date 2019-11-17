from flask import Flask, request
from docMatch import *
import json

app = Flask(__name__)


@app.route('/')
# print(1234)
def home():
    return "Flask server"


@app.route('/postdata', methods=['GET', 'POST'])
def postdata():
    data = request.get_json()
    print(data)
    pencentange = 0
    # do something with this data variable that contains the data from the node server
    pencentange = plagiarism(data['dataOne'], data['dataTwo'])
    # print(pencentange)
    return json.dumps({"vPlagarism": pencentange[0], "pPlagarism": pencentange[1]})


if __name__ == "__main__":
    app.run(debug=True)
