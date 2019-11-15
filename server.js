const express = require('express');
const mongoose = require('mongoose');

const users = require('./route/api/users');
const profile = require('./route/api/profile');
const posts = require('./route/api/posts');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello!'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port $ {port}`));