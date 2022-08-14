import user from '../model/user.js';
import tasks from '../model/tasks.js';

// GET THE USER
const getDataUser = async (req, res) =>{
    let {id} = req.params;


    try {
        const getDataUser = await user.findById({_id:id});
        const getTaskUser = await tasks.find({taskBy:id}).
        populate('taskBy');
    
        res.json({
            data: getDataUser,
            task: getTaskUser
        });
        
    } catch (error) {
        res.status(500).json(error)
    }

}

// MODIFIED USER
const putProfile = async (req, res) =>{
    let {id} = req.params;
    let {name, email, username} = req.body

    try {
        
        const modifiedData = await user.findByIdAndUpdate({_id:id}, {name,email, username});

        res.json(modifiedData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// DELETE ACCOUNT
const deleteProfile = async (req, res) =>{
    let {id} = req.params;

    try {
        
        /*const deleteData*/  await user.findByIdAndDelete({_id:id});
        /*const deleteTask */ await tasks.deleteMany({taskBy:id});

        res.json('User and his task deleted successfully');

    } catch (error) {
        res.status(500).json(error);
    }
}

export default {
    getDataUser,
    putProfile,
    deleteProfile
}