#!/usr/bin/env node

import { TaskController } from "./src/TaskController.js";
import pg from 'pg';

const database = new pg.Pool({
    user: 'postgres',
    password: '1234',
    database: 'task_cli',
    host: 'localhost',
    port: 5432
});
new TaskController(database).init(process.argv.slice(2));
