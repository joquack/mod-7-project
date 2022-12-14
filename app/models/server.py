from .db import db
from app.models.server_user import server_users

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_name = db.Column(db.String(255), nullable=False)
    server_img = db.Column(db.Text, default='https://avatars2.githubusercontent.com/u/36101493?s=280&v=4')

    users = db.relationship('User', secondary=server_users, back_populates='servers')
    channels = db.relationship('Channel', back_populates='servers', cascade='delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_name': self.server_name,
            'server_img': self.server_img,
            'channels': [channel.to_dict() for channel in self.channels]
        }
