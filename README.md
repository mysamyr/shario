# LAN File Sharing App

## Stack

- [Deno](https://deno.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Oak](https://oakserver.org/)

## Features

- Share files over LAN
- Generate QR codes for file sharing
- Manage files (upload, view, download, delete, rename)
- Compress multiple files into a ZIP archive for download
- Share text
- Save text as a file
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
4. For development with auto-reload:
   ```sh
   deno task dev
   ```
   and
   ```sh
   deno task build:dev
   ```

## API Endpoints

- `GET /info` - Retrieve server information
- `GET /files/:file` - Download a specific file
- `GET /files?file={file1,file2}` - Download archive with files
- `GET /qrcodes/:file` - Get QR code for a specific ip
- `POST /` - Upload a file
- `PUT /text` - Upload text
- `PUT /:file` - Rename a file
- `DELETE /?file={file1,file2}` - Delete files

## Linting and formatting

This project uses Deno's default linting and formatting tools.

- To format the code:
  ```sh
  deno task format
  ```
- To lint the code:
  ```sh
  deno task lint
  ```

## TODO

- Add polling or WebSocket for update file list
- Add theme change
- Add help modal content
- Positioning QR codes on mobile
- edit API endpoints
