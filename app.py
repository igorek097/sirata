from flask import Flask
from src.views import views
from config import app as app_config
from config.contentful import get_entries


app = Flask(
    __name__, 
    template_folder=app_config.TEMPLATE_DIR
)


@app.route('/')
def home():
    return views.home()


@app.route('/preview/<project>')
def project_preview(project):
    return views.project_preview(project=project)


@app.route('/project/<project>')
def project_content(project):
    return views.project_content(project=project)


@app.route('/test')
def test():
    projects = get_entries('project')
    import pdb; pdb.set_trace()