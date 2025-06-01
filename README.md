# LAN File Sharing App

## Stack

- [Deno](https://deno.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Oak](https://oakserver.org/)

## Features

- Share files over LAN
- Generate QR codes for file sharing
- Upload/download files via a web interface or using URL
- Share text via a web interface
- Supports simple paste (Ctrl/Cmd + V) for text and file
- Supports Drag&Drop for text and file

## Setup

1. Clone the project:
   ```sh
   git clone git@github.com:mysamyr/shario.git && cd shario
   ```
2. (optional) Create `.env` file based on `.env.example`
3. Build client scripts and styles:
   ```sh
   deno task build
   ```
4. Start the application:
   ```sh
   deno task start
   ```

## API Endpoints

- `GET /info` - Retrieve server information
- `GET /files/:file` - Download a specific file
- `GET /qrcodes/:file` - Get QR code for a specific file
- `GET /files/:file/check` - Check if a file exists
- `POST /` - Upload a file or text
- `PUT /:file` - Rename a file
- `DELETE /:file` - Delete a specific file

## Linting and formatting

This project uses Deno's default linting and formatting tools.

- To format the code:
  ```sh
  deno task format
  ```

## TODOs

- Add polling or WebSocket for update file list
- Add filename validation before upload

