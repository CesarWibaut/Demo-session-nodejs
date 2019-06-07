// We're using express to ease the task
const express = require('express');
// As we're using express, we're also using express-session
const session = require('express-session');

const PORT = 6001;

// Creating an express app
const app = express();

// Here we're telling the express app to use sessions.
// Session are not implemented in the basic express package
app.use(session({
    // secret is like a 'password' to ensure that the session you'll find if from this app (mandatory parameter)
    secret: 'mandatory secret',
    // resave forces the session to be saved even if there were no modification (mandatory parameter)
    resave: false,
    // saveUninitialized saves the session even if it's not initialized (mandatory parameter)
    saveUninitialized: false,
}));

// The global counter
let globalCounter = 0;

// Middleware used to initialize the count value from the session if it's not initialized yet
app.use((req, res, next) => {
    if (!req.session.count) {
        req.session.count = 0;
    }
    next();
});

// Simple route to display the number of connection of that particular user over the global connection number
app.get('', (req, res) => {
    globalCounter++;
    return res.status(200).send(
        `Vous avez chargé la page ${++req.session.count} fois sur ${globalCounter} fois.`
    );
});

// Starting the server
const server = app.listen(PORT, () => console.log(`Server started at port ${server.address().port}`));
