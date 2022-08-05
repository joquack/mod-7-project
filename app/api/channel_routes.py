from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Channel, db

channel_routes = Blueprint('channel', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@channel_routes.route('')
def channel_get():
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}
