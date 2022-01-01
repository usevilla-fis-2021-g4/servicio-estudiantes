# Authentication Service

## Overview
This is the authentication service that is responsible for handling all operations related to users.

The API is defined in the api directory called openapi.yml.  This is an API using the OAS3.0 specification.

### Running the MongoDb locally (if not already running)
docker run -d --restart "always" -p 27017-27019:27017-27019 --hostname <YOUR HOSTNAME> -e TOKEN_KEY="YOUR TOKEN KEY" --name mongo mongo:4.2.0

### Running the server locally
To run the server, run:

```
npm start
```

### Building the Docker image
To build the docker image, run:

```
docker build -t authentication-service .
```

### Running the Docker container
To start the docker container, run:

```
docker run -d --restart "always" -p 8083:8083 -e MONGO_URL="mongodb://<YOUR HOSTNAME>:27017/userdb" --name authentication-service authentication-service:latest 
```

To view the Swagger UI interface:

```
open http://localhost:8083/docs
```


### Okteto
Update the chart/values.yaml env variables with the namespace for your Okteto cluster e.g replace [YOUR NAMESPACE] with your namespace

```
env:
MONGO_URL: mongodb://mongodb.[YOUR NAMESPACE].svc.cluster.local:27017/userdb
```
