from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, FileField
from wtforms.validators import DataRequired

class ChannelForm(FlaskForm):
    server_id = IntegerField('UserId',validators=[DataRequired()])
    channel_name = StringField('Channel-Name',validators=[DataRequired()])
    description = StringField('Description',validators=[DataRequired()])
