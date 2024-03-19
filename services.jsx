// server.jsx
const express = require('express');
const next = require('next');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/User');
const authRoutes = require('./routes/auth');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const server = express(); // Define Express app once

// Middleware setup...
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(session({
    secret: 'your_secret_key', resave: false, saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());

// Configure Passport.js to use a local strategy for authentication
passport.use(new LocalStrategy((username, password, done) => {
    // Your authentication logic here
    User.findOne({username: username}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Fetch user from database using id
    // Example: User.findById(id, (err, user) => done(err, user));
});

// Mount authentication routes
server.use('/auth', authRoutes);

// Handle Next.js routing
server.all('*', (req, res) => {
    return handle(req, res);
});

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
});

// Start the Next.js app
app.prepare().then(() => {
    // Server is already running, Next.js will handle requests through Express
});