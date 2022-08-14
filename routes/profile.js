import express from 'express';
import profile from '../controllers/profile.js';

const routerProfile = express.Router();

routerProfile.get('/:id', profile.getDataUser);

routerProfile.put('/:id', profile.putProfile);

routerProfile.delete('/:id', profile.deleteProfile);


export default routerProfile;