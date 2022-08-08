from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FileField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    user_id = IntegerField('UserId',validators=[DataRequired()])
    server_name = StringField('Server-Name',validators=[DataRequired()])
    server_img = FileField('Server-Image')
