# Welcome to Quackord!
## About
Quackord is a site where you can send messages and interact with users through chatting

Link to live site: [https://quackord.herokuapp.com/](https://quackord.herokuapp.com/)

[Database Schema](https://github.com/joquack/mod-7-project/wiki/Database-Schema)

[Feature List](https://github.com/joquack/mod-7-project/wiki/Feature-List)

[User Stories](https://github.com/joquack/mod-7-project/wiki/User-Stories)

[Wireframes and Front End Routes](https://github.com/joquack/mod-7-project/wiki/Wireframes-and-Front-End-Routes)

## Built Using These Resources:

 - JavaScript
 - Python
 - Flask
 - SQLAlchemy
 - React
 - Redux
 - CSS
 
To use this repository you will: 
1. Clone repo using ```git clone https://github.com/joquack/mod-7-project.git``` in your terminal

2. In the root folder run ```pipenv install``` to install all dependencies 

3. Create a .env file based on the .envexample in the backend

4. Setup your DATABASE and your USER with the PASSWORD for your postgreSQL with what you used in the .env

5. From the root directory, cd into the react-app folder and run ```npm install``` to install all dependencies

6. cd back into the root folder and run ```pipenv shell```

7. Migrate and seed the database using: 
```
flask db migrate
flask db upgrade
flask seed all
```

8. From the root folder run ```flask run``` to start the backend server

9. Open up a new terminal and cd into the react-app folder and run ```npm start``` to start frontend

10. Navigate to localhost:3000 in the browser

___



