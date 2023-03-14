from flask import Flask, send_from_directory, send_file
from werkzeug.exceptions import NotFound, Forbidden
import pathlib

app = Flask(__name__)
dist_folder = pathlib.Path('../dist')

@app.route('/')
def show_index():
    return send_file(dist_folder / 'index.html', mimetype='text/html', max_age=3600)

@app.route('/<path:subpath>')
def show_path(subpath):
    try:
        return send_from_directory(dist_folder, subpath)
    except (NotFound, Forbidden) as e:
        return show_index()
