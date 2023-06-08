# Nodejs sample project

This is a Node.js project that implements a stack and a key-value store with CRUD functionality. It provides a set of endpoints for manipulating the stack and the store.

# Steps to start the project

1. Install the dependencies: `npm install`
2. Start the server: `npm start`

Make sure you have Node.js and npm installed on your system.

# Steps to run the tests. Run the following command:

1. `npm test`

# Steps to test the endpoints with curl:

### Stack endpoints:

1. http://localhost:3000/stack POST endpoint:
   - `curl -X POST -H "Content-Type: application/json" -d '{"item":"Hello"}' http://localhost:3000/stack`
2. http://localhost:3000/stack GET endpoint:
   - `curl http://localhost:3000/stack`

### Store endpoints:

1. http://localhost:3000/store POST endpoint:
   - `curl -X POST -H "Content-Type: application/json" -d '{"key":"name", "value":"John", "ttl":30}' http://localhost:3000/store`
2. http://localhost:3000/store/name GET endpoint:
   - `curl http://localhost:3000/store/name`
3. http://localhost:3000/store/name DELETE endpoint:
   - `curl -X DELETE http://localhost:3000/store/name`

# Steps to test the endpoints with Postman:

1. Make sure you have installed Postman on your system. You can download it from the official website:
   - https://www.postman.com/downloads/
2. Once installed A workspace should be created.
3. Click on the "import" button and select the json file in the PostmanCollection folder in the project
4. Start the server and you will be able to test the respective endpoints.



