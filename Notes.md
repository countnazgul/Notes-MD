# Notes UI

## TODO

- remove/delete account and data #HIGH
- automated deployment #HIGH
    - template DB to be pushed on deployment #HIGH
- reload/refresh #LOW
    - reload/refresh buttons to get latest data for notes list and the current note content
- main page design #MEDIUM
    NOTE: done some work on it. More should be done.
    - explanation
    - screenshots?
    - ~~does the main page overlaps with the about page?~~ #DONE
    - include link to VSCode marketplace for the extension
    - short explanation of any MD assumptions (like tab size)

- ~~user profile~~ #DONE
    - main page to display user info (from GH)
    - (re)generate api key
        - API key to be JWT token
            - to identify the user from the token (instead of keeping user <-> api in db)
- ~~SEO/meta tags to be added~~ #DONE
- ~~store user profile~~ #DONE
- ~~custom sing-in and sign-out pages~~ #DONE
- ~~filter/search note titles~~ #DONE
- ~~need for note route?~~ #DONE
    - ~~when open a note to change the url. This will help if the page is refreshed~~ #DONE
- ~~delete note~~ #DONE

## Questions

- how to handle images?
- links to sections
- TOC?

## Random

- private/public notes?
    - this will require a lot of involvement into the project. Have to think about if there is any reason to continue beyond the MVP phase
    - if the above is `Yes` then have to think about these:
        - if public and not owner - dont show note actions (open in vscode, delete etc)
        - allow forking?
        - allow export of all?
        - renaming? (have to keep some mapping somehow)
        - proper DB
        - backups
        - encryption of the notes inside the db
