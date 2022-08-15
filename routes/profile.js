import express from 'express';
import profile from '../controllers/profile.js';
import validateJWT from '../jwt/validateToken.js';
// import validateToken from '../jwt/validateToken.js';

const routerProfile = express.Router();

routerProfile.get('/:id', validateJWT.validateTokenAndAuthorization, profile.getDataUser);

routerProfile.put('/:id', validateJWT.validateTokenAndAuthorization, profile.putProfile);

routerProfile.delete('/:id', validateJWT.validateTokenAndAuthorization, profile.deleteProfile);


export default routerProfile;