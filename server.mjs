import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';
dotenv.config();

const app = express();
const accountsFilePath = 'accounts.json';
const port = process.env.PORT || 3000;
let accounts = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

async function loadAccounts() {
    try {
        const resp = await User.find();
        accounts = resp.map(user => user.username);
    } catch (error) {
        console.error('Failed to load accounts from file:', error);
    }
}

async function saveAccounts() {
    try {
        await fs.writeFile(accountsFilePath, JSON.stringify(accounts, null, 2));
        console.log('Accounts saved to file');
    } catch (error) {
        console.error('Failed to save accounts to file:', error);
    }
}

loadAccounts();

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/adduser', (req, res) => {
    res.sendFile(path.join(publicPath, 'adduser.html'));
});

app.get('/creategame', (req, res) => {
    res.sendFile(path.join(publicPath, 'creategame.html'));
});

app.post('/adduser', async (req, res) => {
    if (req.body.username !== '') {
        const username = req.body.username;
        const response = await fetch(`https://lichess.org/api/user/${username}`);
        if (!response.ok) {
            res.send('User not found');
            return;
        }

        const dbuser = await User.findOne({ username });
        if (!dbuser) {
            const newuser = await User.create({ username });
            await newuser.save();
            accounts.push(username);
            res.redirect('/');
        } else {
            res.send('User already exists');
        }
    } else {
        res.send('No data received');
    }
});

app.get('/tournament', (req, res) => {
    res.sendFile(path.join(publicPath, 'tournament.html'));
});

app.get('/getaccounts', (req, res) => {
    loadAccounts();
    res.json(accounts);
});

const startServer = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        // const dbName = process.env.DB_NAME;
        const mongoUri = `${process.env.MONGODB_URI}`;

        await mongoose.connect(mongoUri);

        console.log(`Connected to database user`);
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

export { app, startServer };
