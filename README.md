# LAN File Sharing App

## Stack

- [Deno](https://deno.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Oak](https://oakserver.org/)

## Features

- Share files over LAN
- Generate QR codes for file sharing
- Manage files (upload, view, download, delete, rename)
- Share text
- Supports paste (Ctrl/Cmd + V) for text and file
- Supports Drag&Drop for text and file

## Setup

1. Clone the project:
   ```sh
   git clone git@github.com:mysamyr/shario.git && cd shario
   ```
2. (optional) Create `.env` file in root according to `.env.example`
3. Start the application:
   ```sh
   deno task start
   ```

## API Endpoints

- `GET /info` - Retrieve server information
- `GET /files/:file` - Download a specific file
- `GET /qrcodes/:file` - Get QR code for a specific file
- `GET /files/:file/check` - Check if a file exists
- `POST /` - Upload a file
- `PUT /text` - Upload text
- `PUT /:file` - Rename a file
- `DELETE /` - Delete all uploaded files
- `DELETE /:file` - Delete specific file

## Linting and formatting

This project uses Deno's default linting and formatting tools.

- To format the code:
  ```sh
  deno task format
  ```

## TODO

- Add polling or WebSocket for update file list
- Add theme change
- Add button with help modal
- Add download all button
- Hide QR codes on mobile
