# e-shop
E-shop site using React, Express and MongoDB

I followed the Code Step By Step series on this stack of technologies, and I have used my own CSS styling (unfortunately), and added some functionality like password hashing and salting, input validation and the ability to change user email and password.

Still a work-in-progress, and as Uni is starting back on the 9th of Jan, I will likely leave this project alone for some time.

To get this running, first  do 
* In /backend /frontend and the root directory do %npm install
* in /backend do %nodemon
* in /frontend do %npm start
* have a MongoDB instance running on localhost:27017 
* MongoDB instance should have a database named 'e-comm' with two collections names 'products' and 'users'
* voila!

When signing up the name must be at least 2 chars long, the email must be of valid syntax and the password must be strong.
