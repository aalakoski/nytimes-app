# NY Times App exercise
This is an exercise app to utilise NY Times Books API.

# Installation notes
To run the app locally follow these instructions. It is assumed you are using *newish* Node.js version.
By the time of development the Node.js version was `v16.10.0`.

## server
Install dependecies by running in `nytimes-app/server`

```
npm install
```
Make sure you rename or copy the `.env.example` file as `.env`

For the `.env` file update the **NY_TIMES_API_KEY** with your own key. To obtain your own key go to:
https://developer.nytimes.com/get-started

Once you've set up the `.env` start the local server with:
```
npm run dev
```

## client
Install dependecies by running in `nytimes-app/client`

```
npm install
```
Make sure you rename or copy the `.env.example` file as `.env`.

Once you've set up the `.env` start the local client dev server with (In separate terminal window):
```
npm start
```


# Things to improve 
If I would devote more time on this here are the things I would've added:

- Write some basic unit tests for both client and server.
- Error handling. Currently the server has zero error handling for API failures. Also would've added a separate error component for client to indicate the user about the errors.
- eslint and prettier for basic linting and code style enforcing.
- deployment pipeline for deploying both server & client into some hosting like AWS or GCP.