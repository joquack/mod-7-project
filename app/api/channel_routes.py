from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Channel, db
from app.forms.channel_form import ChannelForm

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

@channel_routes.route('/new', methods=['POST'])
def channel_post():
    form = ChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_channel = Channel(
            server_id = form.data["server_id"],
            channel_name = form.data["channel_name"],
            description = form.data["description"],
            )
        db.session.add(new_channel)
        db.session.commit()

        return new_channel.to_dict()
    return {'errors': validation_errors_to_error_channels(form.errors)}, 401
