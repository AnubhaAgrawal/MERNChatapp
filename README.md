# Real Time Chat Web Application
It enables realtime, bi-directional communication between web clients and server. It has two parts: a client-side library that runs in the browser, and a server-side library for Node. In this app firstly user have to login and register then he or she is able to do real time chat between active user. It also show current typing status.

## Getting Started

A simple chat web application practice with MongoDb, Express, React  and Node.js and for designing I use material UI and Bootstrap.

### Features

* Uses Express as the application Framework.
* Real-time communication between a client and a server using Socket.io.
* Uses MongoDB, Mongoose for storing client registered information
 
### Installation
Make sure you have Node.js and npm install.
* Clone or Download the repository

```
git clone https://github.com/AnubhaAgrawal/MERNChatapp.git
```
* Install Dependencies
```
 npm install express
 npm install nodemon --save-dev
 npm install @material-ui/core
 npm i socket.io-client
 npm i socket.io
 npm i socket.io-client/dist/socket.io
 (first move to client folder) npm install react-router
 npm install passport
 npm install bcrypt
 npm install passport-jwt
 npm install passport-local
 npm install cookie-parser
 npm install mongoose
 npm install --save cors
```
 
### Start the Application
 * Run Mongodb Server
```
cd MERN
npm run dev    
```
  * Run React application
```  
(new Terminal) cd client
npm start
```
* Run Socket server
```
cd client/server
node src/Server/index.js
 ```
### Sockets
Having an active connection opened between the client and the server so client can send and receive data. This allows real-time communication using TCP sockets. This is made possible by Socket.io.
The client starts by connecting to the server through a socket(maybe also assigned to a specific namespace). Once connections is successful, client and server can emit and listen to events.
 
### Future Scope
* I want to made various changes in current app.
* I want add a feature to add more chatRooms.
* One user can register for particular chat rooms
* user can see the current list of active users.
* user can also send one to one direct message to eachother
 
