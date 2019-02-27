# JP Morgan Technical Test

## Installation

`yarn install`

`cd client && yarn install`

On both the root folder and in client run:

`yarn start`

You are now able to view the client at: `http://localhost:3001`

## Notes

Due to personal time constraints the code isn't as complete as I'd like. It matches the requirements although instead of a pubsub method to handle viewing updates across clients, I've added a quick polling mechanism to check the API from the react frontend.

The image uploading itself is very rudimentary. I'd ordinarily implement a fileFilter in multer and pass some helpful information when something was rejected.

The code itself could be made a little cleaner but I feel it reads reasonably well. The react code should be split into a reusable gallery component instead of being crammed into the app.js file.

Finally, no tests are included. Ordinarily I would ship with tests.

## Thanks!
