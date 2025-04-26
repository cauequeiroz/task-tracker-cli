import { Task } from "./model/Task.js";

export class TaskController {
    constructor(database) {
        this.database = database;
    }

    init(userInput) {
        try {
            if (userInput[0] === 'add') {
                this.add(userInput[1]);
            }
        } catch(error) {
            console.log(`${error}`)
        }
    }

    add(description) {
        if (!description || description.length === 0) {
            throw new Error('You must pass a task name as second argument.');
        }

        const task = new Task(this.database.nextAvailableId, description);        
        this.database.save(task);

        console.log(`Task added successfully (ID: ${task.id})`);
    }
}