import tasks from '../model/tasks.js';

const getTask = async (req, res) =>{
    let {id} = req.params

    try {
        const tasksById = await tasks.find({taskBy: id}).
        populate('taskBy', {name: 0, email: 0, password: 0});

        res.json(tasksById);
        
    } catch (error) {
        res.status(500).json(error)
    } 
}

const createTask =  async (req, res) =>{
    const {title, description, important, period, state, taskBy='62f5b8d7badb25de84d583db'} = req.body

    try {
        const newTask = new tasks({
            title,
            description,
            important,
            period,
            state,
            taskBy
        }); 

        /*const taskCreated =*/ await newTask.save();

        // console.log(taskCreated);

        res.json('Task created Successfully');

    } catch (error) {
        res.status(500).json(error)
    }
}

// this work by the _id from the task
const modifiedTask = async (req, res) => {
    let {id} = req.params; /*id from the task*/ 
    let {title, description, period, state} = req.body;

    try {
        
        const modified = await tasks.findByIdAndUpdate({_id:id},{title, description, period, state});

        console.log(modified);
        res.json(modified);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

const deletedTask = async (req, res) =>{
    let {id} = req.params;

    try {
        /*const delet = */await tasks.findByIdAndDelete({_id:id});
        
        // console.log(delet);
        res.json('has been deleted a task');

    } catch (error) {
        res.status(500).json(error);
    }
}

export default {
    createTask,
    getTask,
    modifiedTask,
    deletedTask
};