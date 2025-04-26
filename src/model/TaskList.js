import { Task } from "./Task.js";

export class TaskList {
    constructor() {
        this.nextAvailableId = 0;
        this.tasks = [];
    }

    add(description) {
        const task = new Task(this.nextAvailableId, description);    

        this.tasks.push(task);
        this.nextAvailableId += 1;

        console.log(`Task added successfully (ID: ${task.id})`);
    }

    update(id, description) {
        this.tasks = this.tasks.map(item => item.id !== id ? item : ({
            ...item,
            description,
            updatedAt: new Date().toLocaleString()
        }));
    } 

    delete(id) {
        this.tasks = this.tasks.filter(item => item.id !== id);
    }

    deleteAll() {
        this.tasks = [];
    }
}