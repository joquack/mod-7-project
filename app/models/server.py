from .db import db

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    server_name = db.Column(db.String(255), nullable=False)
    server_img = db.Column(db.String(255))

    

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_name': self.server_name,
            'server_img': self.server_img
        }
