# Artist Management System
The following full stack application has been developed with the following tech stack:

- Backend
    - Node.js with Express
    - Powered by mysql database
- API
    - [jsend](https://github.com/omniti-labs/jsend) Specification to standardize API responses
    - [Bruno API Testing Client](https://www.usebruno.com/) for testing APIs
- Frontend
    - React.js

### Configuring backend
- Make .env file from .env.example in the /backend folder. 
- The ROUTE_DELAY environment variable can be updated to delay the API Response time by given milliseconds. This is done to simulate the real network delay in production. 
- Setting up MYSQL Database
    - Default data are available in 'schemaAndData.sql' file. If this is imported, 3 user accounts: admin@gmail.com, manager@gmail.com and artist@gmail.com will be created with password: asdfasdf. 
    - Otherwise, clean install can be done with 'schema.sql' file, which only creates the needed tables.


- Finally, install the npm dependencies and run the project with:

        npm run dev



### Playaround with APIs
- The /api folder can be opened with [Bruno](https://www.usebruno.com/) for testing backend routes and seeing API Structures.
    - Make sure the BASE_URL and ACCESS_TOKEN environment variables are set correctly while testing APIs.

### Configuring frontend
- Copy the .env.local.example file into .env.local file in /frontend and run the react project after installing the dependencies with:

        npm start

#### Note
Make sure the same PORT number in which the backend is running is used in the frontend react app's .env.local file. Dont use a trailing / in the specified URL.