#!/usr/bin/env node

import { TaskController } from "./src/TaskController.js";
import { TaskDatabase } from "./src/TaskDatabase.js";

const database = new TaskDatabase();
await database.init();

new TaskController(database).init(process.argv.slice(2));
