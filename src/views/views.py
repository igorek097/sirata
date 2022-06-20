import os
import pdb
from flask import render_template, request
from config import app, projects
from config.contentful import get_entries, get_entry


def home():
    context = {
        'projects': get_entries('project')
    }
    return render_template('home.html', **context)


def project_preview(project):
    project = get_entry(project)
    context = {
        'images': [[f'https:{i.url()}' for i in project.images][0]]
    }
    return render_template('project-content.html', **context)


def project_content(project):
    project = get_entry(project)
    context = {
        'images': [f'https:{i.url()}' for i in project.images]
    }
    return render_template('project-content.html', **context)
    