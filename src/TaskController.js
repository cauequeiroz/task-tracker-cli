import { Task } from "./model/Task.js";
import { isValidNumber, isValidString } from "./utils.js";

export class TaskController {
    constructor(database) {
        this.database = database;
    }

    init(userInput) {
        try {
            switch(userInput[0]) {
                case 'add':
                    this.add(userInput[1]);
                    break;
                case 'update':
                    this.update(userInput[1], userInput[2]);
                    break;
                case 'delete': 
                    this.delete(userInput[1]);
                    break;
                case 'delete-all': 
                    this.deleteAll();
                    break;
                default:
                    throw new Error('You must pass a valid command.');
            }
        } catch(error) {
            console.log(`${error}`)
        }
    }

    add(description) {
        if (!isValidString(description)) {
            throw new Error('You must pass a task description as first argument.');
        }

        const task = new Task(this.database.nextAvailableId, description);        
        this.database.save(task);

        console.log(`Task added successfully (ID: ${task.id})`);
    }

    update(id, description) {
        if (!isValidNumber(id)) {
            throw new Error('You mast pass a valid task id as first argument');
        }

        if (!isValidString(description)) {
            throw new Error('You must pass a task description as second argument.');
        }

        this.database.update(Number(id), description);
    }

    delete(id) {
        if (!isValidNumber(id)) {
            throw new Error('You mast pass a valid task id as first argument');
        }

        this.database.delete(Number(id));
    }

    deleteAll() {
        this.database.deleteAll();
    }
}