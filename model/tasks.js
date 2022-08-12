import mongoose from "mongoose";

// Task Collection
const taskSchema = mongoose.Schema({
    title: String,
    description: String,
    important: Boolean,
    period: Date,
    state: {
        type: String,
        enum: ['pending', 'complete', 'incomplete'],
        default: 'pending'
    },
    taskBy: {
        type: mongoose.Schema.Types.ObjectId, /*join with collection Users by ObjectID()*/
        ref: "Users"
    }
});

export default mongoose.model('tasks', taskSchema);