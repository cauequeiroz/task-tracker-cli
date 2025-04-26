import fs from 'node:fs/promises';

export class JsonDatabase {
    constructor() {
        this.jsonPath = new URL('../db.json', import.meta.url).pathname
        this.templatePath = new URL('../db-template.json', import.meta.url).pathname;
    }

    async write(content) {
        await fs.writeFile(this.jsonPath, JSON.stringify(content, null, 2));
    }

    async read() {
        try {
            await fs.access(this.jsonPath);
        } catch {
            await fs.copyFile(this.templatePath, this.jsonPath);
        }

        return JSON.parse(await fs.readFile(this.jsonPath, 'utf-8'));
    }
}