# Student Service

## Overview
This is the student service that is responsible for handling all operations related to students.

The API is defined in the api directory called openapi.yml.  This is an API using the OAS3.0 specification.

### Running the MongoDb locally (if not already running)
docker run -d --restart "always" -p 27017-27019:27017-27019 --hostname <YOUR HOSTNAME> --name mongo mongo:4.2.0

### Running the server locally
To run the server, run:

```
npm start
```

### Building the Docker image
To build the docker image, run:

```
docker build -t student-service .
```

### Running the Docker container
To start the docker container, run:

```
docker run -d --restart "always" -p 8080:8080 -e MONGO_URL="mongodb://<YOUR HOSTNAME>:27017/studentdb" -e AUTHENTICATION_SERVICE_URL="http://localhost:8083/api/v1/verify" -e SUBJECT_SERVICE_URL="http://localhost:8081/api/v1/subjects" --name student-service student-service:latest 
```


To view the Swagger UI interface:

```
open http://localhost:8080/docs
```


