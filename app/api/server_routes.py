from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Server, db
from app.forms.server_form import ServerForm


server_routes = Blueprint('server', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@server_routes.route('')
def server_get():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}
