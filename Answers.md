<!-- Answers to the Short Answer Essay Questions go here -->
Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

Middleware: a function that operates on an action call. It acts as a gatekeeper, allowing or disallowing certain actions whose path it is inserted into, or acting to manipulate, log, or stop an action before the action is passed to either a reducer or the server for processing. In terms of authentication, it acts as a birdge between the database and the application.

Express Sessions: are a place to store information you want to access throughout multiple requests. They help us to store state, especially the state of being authenticated. A session id or cookie can be inserted into sessions storage, and sent with each request as user makes. This, along with programming to detect an authorized status, allows the user to access information from our server, or to see certain parts of our app/site.

bcrypt: is a password encryption function. It works to both encrypt passwords and to slow down attackers as they try to penetrate your server and access data. It uses a hashing function in conjunction with a salt to encrypt your data, and also has a cost parameter, which serves to slow down how many passwords you can encrypt per cycle, and is a variable result. For the current speed of processors, 10-12 rounds is appropriate to give us approximately 10 hashes per hundred ms. The result of the hashing is what is stored in your data, never the plain text password. You re-hash the input password and compare it to your stored result to tell whether the correct password was entered, which is a function provided by bcrypt.

JWT: JSON Web Token - similar to a cookie in that is stores information that can be used in authentication. The server provides the JWT, which is sent along with each user interaction to facilitate 'the handshake' between user and server. If the JWT is confirmed to have come from the authentication server, the user is allowed to continue interacting with the app.


What does bcrypt do in order to prevent attacks?
See bcrypt section above.


What are the three parts of the JSON Web Token?
Header, payload, signature


