import { STATUS } from "./Status.js";
import { TaskList } from "./TaskList.js";
import { isValidNumber, isValidString } from "./utils.js";

export class TaskController {
    constructor(database) {
        this.database = database;
        this.taskList = new TaskList(database);
    }

    async init(userInput) {
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
                case 'mark-in-progress':
                    this.markInProgress(userInput[1]);
                    break;
                case 'mark-done':
                    this.markDone(userInput[1]);
                    break;
                case 'list':
                    this.list(userInput[1]);
                    break;
                default:
                    throw new Error('You must pass a valid command.');
            }
        } catch(error) {
            console.log(`[ERROR] ${error.message}`)
        }
    }

    add(description) {
        this.validateDescription(description);

        this.taskList.add(description);
    }

    update(id, description) {
        this.validateId(id);   
        this.validateDescription(description);

        this.taskList.update(Number(id), description);
    }

    delete(id) {
        this.validateId(id);   

        this.taskList.delete(Number(id));
    }

    markInProgress(id) {
        this.validateId(id);   

        this.taskList.markInProgress(Number(id));
    }

    markDone(id) {
        this.validateId(id);   

        this.taskList.markDone(Number(id));
    }

    list(filter) {
        this.taskList.list(filter ?? null);
    }

    validateId(id) {
        if (!isValidNumber(id)) {
            throw new Error('You mast pass a valid task id as first argument.');
        }
    }

    validateDescription(description) {
        if (!isValidString(description)) {
            throw new Error('You must pass a task description as second argument.');
        }
    }
}