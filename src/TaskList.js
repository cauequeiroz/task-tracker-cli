import { styleText } from "node:util";

export class TaskList {
    constructor(database) {
        this.database = database;
    }

    async add(description) {
        const timestamp = new Date().toLocaleString();
        const { rows } = await this.database.query(`
            INSERT INTO task
                (description, status_id, created_at, updated_at)
            VALUES
                ($1, 1, $2, $2)
            RETURNING id;
        `, [description, timestamp]);

        console.log(`Task added successfully (ID: ${rows[0].id})`);
        this.database.end();
    }

    async update(id, description) {
        const timestamp = new Date().toLocaleString();
        const { rowCount } = await this.database.query(`
            UPDATE task SET
                description = $2, updated_at = $3
            WHERE id = $1;
        `, [id, description, timestamp]);
        
        this.database.end();

        if (rowCount === 0) {
            throw new Error('You mast pass a valid task id as first argument.');
        }
    } 

    async delete(id) {
        const { rowCount } = await this.database.query(`
            DELETE FROM task WHERE id = $1;
        `, [id]);

        this.database.end();

        if (rowCount === 0) {
            throw new Error('You mast pass a valid task id as first argument.');
        }
    }

    async markInProgress(id) {
        const timestamp = new Date().toLocaleString();
        const { rowCount } = await this.database.query(`
            UPDATE task SET
                status_id = 2, updated_at = $2
            WHERE id = $1;
        `, [id, timestamp]);

        this.database.end();

        if (rowCount === 0) {
            throw new Error('You mast pass a valid task id as first argument.');
        }
    }

    async markDone(id) {
        const timestamp = new Date().toLocaleString();
        const { rowCount } = await this.database.query(`
            UPDATE task SET
                status_id = 3, updated_at = $2
            WHERE id = $1;
        `, [id, timestamp]);

        this.database.end();

        if (rowCount === 0) {
            throw new Error('You mast pass a valid task id as first argument.');
        }
    }

    async list(filter) {
        let filterId = null;
        
        if (filter) {
            const { rows: statusResult, rowCount } = await this.database.query(`
                SELECT id, name FROM status
                WHERE name = $1;
            `, [filter]);
            
            if (rowCount === 0) {
                this.database.end();
                throw new Error('You must pass a valid filter as first argument.');
            }

            filterId = statusResult[0].id;
        }

        let query = `
            SELECT t.id, t.description, s.readable_name AS status_name, t.created_at, t.updated_at
            FROM task t
            INNER JOIN status s ON s.id = t.status_id
        `;
        let params = [];

        if (filterId) {
            query += ' WHERE t.status_id = $1';
            params.push(filterId);
        }

        const { rows: taskResult } = await this.database.query(query, params);
        this.database.end();

        console.log('\n');
        taskResult.forEach(task => {
            console.log(styleText(['bold', 'bgGray'],`[id: ${task.id}] ${task.description}`));
            console.log(`   Status: ${task.status_name}`);
            console.log(`   Created at: ${task.created_at}`);
            console.log(`   Updated at: ${task.updated_at}`);
        });
        console.log('\n');
    }
}