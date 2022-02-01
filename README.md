# Mconf-api-doc

A repository with SwaggerUI and Redoc that reads the `openapi.json` file and renders a documentation UI using the OpenAPI structure.

## Code dependencies

To install and run, just use the commands bellow:

```bash
$ npm install
$ node src/index.js
```

## Docker

We provide a Dockerfile to run the docs in a container:

```bash
$ docker build -f Dockerfile -t mconf/api-docs:latest .
$ docker-compose -f development.yml up
```


## Makefile

Just use the commands bellow to run the documentation easily:

```bash
$ make docker-build
$ make up
```

To view the documentation with [ReDoc](https://github.com/Rebilly/ReDoc)
Just go to [http://localhost:3000/docs](http://localhost:3000/docs)

To view the documentation with [Swagger UI](https://swagger.io/tools/swagger-ui/)
Just go to [http://localhost:3000/docs2](http://localhost:3000/docs2)
