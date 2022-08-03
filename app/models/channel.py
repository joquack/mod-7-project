from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'), nullable=False)
    channel_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'channel_name': self.channel_name,
            'description': self.description
        }
