import express from 'express';
import Tasks from '../controllers/task.js';

const routerTasks = express.Router();

// Get All tasks
routerTasks.get('/:id', Tasks.getTask);

// Create a task
routerTasks.post('/', Tasks.createTask);

// Modified a taks
routerTasks.put('/:id', Tasks.modifiedTask);

// Delete a task
routerTasks.delete('/:id', Tasks.deletedTask);



export default routerTasks;