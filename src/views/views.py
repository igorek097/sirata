import os
from flask import render_template, request
from config import app, projects


def home():
    context = {
        'projects': projects.projects
    }
    return render_template('home.html', **context)


def project_preview(project):
    context = {
        'images': [get_project_images(project)[0]]
    }
    return render_template('project-content.html', **context)


def project_content(project):
    context = {
        'images': get_project_images(project)
    }
    return render_template('project-content.html', **context)
    

def get_project_images(project):
    target_dir = os.path.join(app.BASE_DIR, f'static/images/projects/{project}')
    images = [f'/static/images/projects/{project}/{i}' for i in os.listdir(target_dir)]
    return images
