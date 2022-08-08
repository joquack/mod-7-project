from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Server, db
from app.forms.server_form import ServerForm
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)


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

@server_routes.route('/new', methods=["POST"])
@login_required
def add_server():
    form = ServerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if request.files:
            image = request.files["server_img"]
            if not allowed_file(image.filename):
                return {"errors":"file type not permitted"}, 400

            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400

            url = upload["url"]
        else:
            url = None

        new_server = Server(
            user_id = form.data["user_id"],
            server_name = form.data["server_name"],
            server_img = url
            )
        db.session.add(new_server)
        db.session.commit()

        return new_server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
