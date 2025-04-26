import { Task } from "./model/Task.js";
import { TaskList } from "./model/TaskList.js";
import { isValidNumber, isValidString } from "./utils.js";

export class TaskController {
    constructor(database) {
        this.database = database;
        this.taskList = new TaskList();
    }

    async init(userInput) {
        const savedData = await this.database.read();
        this.taskList.tasks = savedData.tasks;
        this.taskList.nextAvailableId = savedData.nextAvailableId;

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
                default:
                    throw new Error('You must pass a valid command.');
            }
        } catch(error) {
            console.log(`[ERROR] ${error.message}`)
        }

        this.database.write(this.taskList);
    }

    add(description) {
        if (!isValidString(description)) {
            throw new Error('You must pass a task description as first argument.');
        }

        this.taskList.add(description);
    }

    update(id, description) {
        if (!isValidNumber(id) || !this.taskList.isValidId(Number(id))) {
            throw new Error('You mast pass a valid task id as first argument');
        }

        if (!isValidString(description)) {
            throw new Error('You must pass a task description as second argument.');
        }

        this.taskList.update(Number(id), description);
    }

    delete(id) {
        if (!isValidNumber(id) || !this.taskList.isValidId(Number(id))) {
            throw new Error('You mast pass a valid task id as first argument');
        }        

        this.taskList.delete(Number(id));
    }

    markInProgress(id) {
        if (!isValidNumber(id) || !this.taskList.isValidId(Number(id))) {
            throw new Error('You mast pass a valid task id as first argument');
        }

        this.taskList.markInProgress(Number(id));
    }

    markDone(id) {
        if (!isValidNumber(id) || !this.taskList.isValidId(Number(id))) {
            throw new Error('You mast pass a valid task id as first argument');
        }

        this.taskList.markDone(Number(id));
    }
}