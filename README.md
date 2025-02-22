# LAN File Sharing App

## Stack

- [Deno](https://deno.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Oak](https://oakserver.org/)

## Setup

- Clone the project
- Create `.env` file according to `.env.example`
- Run `deno run start` to start the application
- Open `http://localhost:3000` in browser (port can be setup with `PORT` variable in `.env`)

## API

- GET /info
- GET /files/:file
- GET /files/:file/check
- POST /
- DELETE /:file

## Linting and formatting

Project uses
[default formatting and linting](https://docs.deno.com/runtime/fundamentals/linting_and_formatting/)
from deno.

- Run `deno task format` to do a formatting and linting.

## TODOs
