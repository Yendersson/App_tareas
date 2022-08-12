import express from 'express';

// Import Routes
import routerAuth from './routes/auth.js';

// Connect Db
import conection from './DB/DBConnection.js';

const app = express();

// Settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Connect to DB
await conection();

// Routes
app.use('/auth', routerAuth);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log('servidor express on', PORT);
})

server.on('error', (err) => console.log('Error servidor express', err.message));
