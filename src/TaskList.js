import { STATUS, STATUS_TEXT } from "./Status.js";
import { Task } from "./Task.js";
import { styleText } from "node:util";

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

    markInProgress(id) {
        this.tasks = this.tasks.map(item => item.id !== id ? item : ({
            ...item,
            status: STATUS["in-progress"],
            updatedAt: new Date().toLocaleString()
        }));
    }

    markDone(id) {
        this.tasks = this.tasks.map(item => item.id !== id ? item : ({
            ...item,
            status: STATUS.done,
            updatedAt: new Date().toLocaleString()
        }));
    }

    list(filter) {
        let filteredTasks = this.tasks;

        if (filter) {
            filteredTasks = this.tasks.filter(task => task.status === STATUS[filter]);
        }

        console.log('\n');
        filteredTasks.forEach(task => {
            console.log(styleText(['bold', 'bgGray'],`[id: ${task.id}] ${task.description}`));
            console.log(`   Status: ${STATUS_TEXT[task.status]}`);
            console.log(`   Created at: ${task.createdAt}`);
            console.log(`   Updated at: ${task.updatedAt}`);
        });
        console.log('\n');
    }

    isValidId(id) {
        return Boolean(this.tasks.find(item => item.id === id));
    }
}