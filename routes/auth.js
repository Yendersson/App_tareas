import express from 'express';
import auth from '../controllers/auth.js';

const routerAuth = express.Router();

// Route to create an account
routerAuth.post('/register', auth.register);

// Route to validate an user
routerAuth.post('/login', auth.login);

export default routerAuth;