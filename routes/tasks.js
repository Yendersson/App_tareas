import express from 'express';
import Tasks from '../controllers/task.js';
import validateJWT from '../jwt/validateToken.js';

const routerTasks = express.Router();

// Get All tasks
routerTasks.get('/:id', validateJWT.validateToken, Tasks.getTask);

// Create a task
routerTasks.post('/:id', validateJWT.validateToken, Tasks.createTask);

// Modified a taks
routerTasks.put('/:id', validateJWT.validateToken, Tasks.modifiedTask);

// Delete a task
routerTasks.delete('/:id', validateJWT.validateToken, Tasks.deletedTask);

export default routerTasks;