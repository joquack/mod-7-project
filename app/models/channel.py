from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    channel_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))

    messages = db.relationship('Message', back_populates='channels', cascade='delete')
    servers = db.relationship('Server', back_populates='channels')

    def to_dict(self):
        return {
            'id': self.id,
            'server_id': self.server_id,
            'channel_name': self.channel_name,
            'description': self.description
        }
