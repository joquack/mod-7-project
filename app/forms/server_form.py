from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    user_id = IntegerField('UserId',validators=[DataRequired()])
    server_name = StringField('Server-Name',validators=[DataRequired()])
