from app.models import db, Channel


# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel1 = Channel(server_id=1, channel_name='test channel 1', description='testing')
    # channel2 = Channel(server_id=1, channel_name='test channel 2', description='test this out')
    channel3 = Channel(server_id=2, channel_name='epic channel', description='this is an epic channel')
    # channel4 = Channel(server_id=2, channel_name='another epic channel', description='this is an even more epic channel')
    channel5 = Channel(server_id=3, channel_name='world of pug', description='i love pug')

    db.session.add(channel1)
    # db.session.add(channel2)
    db.session.add(channel3)
    # db.session.add(channel4)
    db.session.add(channel5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
