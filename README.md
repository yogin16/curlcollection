This is a "learn-react" project. I wanted to learn frontend development and react, so this is somewhat a toy project.
I had too many curls to debug prod issues, testing & monitoring services, etc; that I carried around in a text file.
This is the UI for such a collection! Like a REST client or POSTMAN if you will.

However, postman collection is not useful when your curls contain private hosts. This is like a hosted postman on cloud.

```bash
#start the express server to scan the curl collection dict
node server.js
#start react app server
npm start
```

TODO: both can be served from one single server ^ (remove use of "proxy" from `package.json`)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
