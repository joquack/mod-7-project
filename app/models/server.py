from .db import db
from app.models.server_user import server_users as server_users

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_name = db.Column(db.String(255), nullable=False)
    server_img = db.Column(db.String(255))

    users = db.relationship('User', secondary=server_users, back_populates='server')
    channels = db.relationship('Channel', back_populates='server')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_name': self.server_name,
            'server_img': self.server_img
        }
