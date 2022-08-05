from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    user_id = IntegerField('UserId', validators=[DataRequired()])
    channel_id = StringField('Channel-Id', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
