import { STATUS } from "./Status.js";

export class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.status = STATUS.todo;
        this.createdAt = new Date().toLocaleString();
        this.updatedAt = this.createdAt;
    }
}