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
