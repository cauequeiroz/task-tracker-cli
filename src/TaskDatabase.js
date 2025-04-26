import fs from 'node:fs/promises';

export class TaskDatabase {
    constructor() {
        this.nextAvailableId = 0;
        this.tasks = [];
        this.jsonPath = new URL('../db.json', import.meta.url).pathname;
    }

    async init() {
        try {
            await fs.access(this.jsonPath);
        } catch {
            await fs.writeFile(this.jsonPath, JSON.stringify({ nextAvailableId: 0, tasks: [] }, null, 2));
        }

        const savedData = JSON.parse(await fs.readFile(this.jsonPath, 'utf-8'));
        
        this.tasks = savedData.tasks;
        this.nextAvailableId = savedData.nextAvailableId;
    }

    async updateDatabase() {
        await fs.writeFile(this.jsonPath, JSON.stringify({
            tasks: this.tasks,
            nextAvailableId: this.nextAvailableId
        }, null, 2))
    }

    save(task) {
        this.tasks.push(task);
        this.nextAvailableId += 1;
        this.updateDatabase();
    }

    update(id, description) {
        this.tasks = this.tasks.map(item => item.id !== id ? item : ({
            ...item,
            description,
            updatedAt: new Date().toLocaleString()
        }));

        this.updateDatabase();
    } 

    delete(id) {
        this.tasks = this.tasks.filter(item => item.id !== id);
        this.updateDatabase();
    }

    deleteAll() {
        this.tasks = [];
        this.updateDatabase();
    }
}