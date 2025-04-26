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

            if (userInput[0] === 'update') {
                this.update(userInput[1], userInput[2])
            }
        } catch(error) {
            console.log(`${error}`)
        }
    }

    add(description) {
        if (!description || description.length === 0) {
            throw new Error('You must pass a task description as first argument.');
        }

        const task = new Task(this.database.nextAvailableId, description);        
        this.database.save(task);

        console.log(`Task added successfully (ID: ${task.id})`);
    }

    update(id, description) {
        if (id === undefined || id.length === 0 || isNaN(id)) {
            throw new Error('You mast pass a valid task id as first argument');
        }

        if (!description || description.length === 0) {
            throw new Error('You must pass a task description as second argument.');
        }

        this.database.update(Number(id), description);
    }
}