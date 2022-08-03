from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'channel_id': self.channel_id,
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
