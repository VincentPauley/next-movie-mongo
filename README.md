# Next Movie Mongo

CRUD application for managing a mongo database for movies. Built in
Next JS.

## Setup

### Required Software

- Docker
- NodeJS/NPM

### Run the Project

Install dependencies

```bash
npm install
```

Initialize docker container and volume

```bash
docker compose up
```

Access local mongo database through shell, use docker ps to find the container
ID and use the values from docker compose for authentication

```bash
docker exec -it <Container-ID> mongosh  -u MONGO_INITDB_ROOT_USERNAME -p MONGO_INITDB_ROOT_PASSWORD
```

NOTE: this will keep the container running in the terminal, you could add -d to run the container in detached mode
or just exit the process and restart the container from _Docker Desktop_.

```bash
docker exec -it a4a5de2ddb5e mongosh -u mongoadmin -p pleaseworkey
```

Helpful Mongo Shell Commands

```bash
# exit shell
quit()
```

```bash
# list all databases
show dbs
```

```bash
# switch to specific database
use <db>
```

```bash
# list all collections in current database
db.getCollectionNames()
```

```bash
# find documents in Movie collection
db.movies.find({})
```

```bash
# query movies by title
db.movies.find({ title: 'Whiplash' })
```

Features

[X] - header/nav
[ ] - Next/Previous year page from individual year page
[ ] - link year from movie header to additional movies from
that year (tooltip should reveal how many.)
[X] - Add Movie
[ ] - Edit movie
[ ] - movie rating component
[ ] - synopsis editor
[ ] - movie review/discussion analysis.
[ ] - search by genre
[X] - movie count is something I'd like to use all over the place, make
a common component for it or some way to access it globally.

[ ] - changelog collection that tracks recent updates
[ ] - active user in the application.
[ ] - /movies/<no match> needs to indicate no movie was found by that name

Bugs

[ ] - clicking off a bar in the chart causes a crash

## TICKETS

1. [X]

2.

Make a consistent page structure with components to maintain
a consistent header or something.

3.

Create SVG files for all of the possible rating symbols and implement them into the APP.
