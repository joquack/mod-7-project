from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Message, db
from app.forms.message_form import MessageForm
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)
from datetime import datetime

message_routes = Blueprint('message', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@message_routes.route('')
def message_get():
    messages = Message.query.all()
    return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/new', methods=['POST'])
def message_post():
    form = MessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_message = Message(
            user_id = form.data["user_id"],
            channel_id = form.data["channel_id"],
            body = form.data["body"],
            created_at = datetime.now()
            )
        db.session.add(new_message)
        db.session.commit()

        return new_message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
