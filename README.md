# MultiLang-GSheetToJSON

Request from work.

## Feature

Using Google Sheets to store multilingual data allows PMs, writers, and other relevant personnel to operate and use it more effectively.

Through this project, Google Sheets can be parsed into a JSON file that meets the project's requirements, enabling the use of i18n functionality.

## Installation

```shell
npm install
```

## Usage

1. modify `.env.example` file to `.env` and add your google spread sheet id into the file

    ```env
    ## https://docs.google.com/spreadsheets/d/<spreadsheetId>/edit#gid=<sheetId>
    SPREADSHEET_ID="your-id"
    ```

2. run script

    ```shell
    node parse.js
    ```

## Source File

[My demo Google Sheet](https://docs.google.com/spreadsheets/d/1TUei38N3_b2titiyhhmw7cjBCHihawiFbD7gPt8jDeA/edit?gid=0#gid=0)
