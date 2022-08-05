from app.models import db, Server


# Adds a demo user, you can add other users here if you want
def seed_servers():
    server1 = Server(user_id=1, server_name='Test Server', server_img='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png')
    server2 = Server(user_id=2, server_name='Epic Server')
    server3 = Server(user_id=2, server_name='Pug Enjoyers', server_img='https://plugins.jetbrains.com/files/7094/91885/icon/pluginIcon.png')

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
