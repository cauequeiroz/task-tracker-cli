#!/usr/bin/env node

import { TaskController } from "./src/TaskController.js";
import { JsonDatabase } from "./src/JsonDatabase.js";

const database = new JsonDatabase('./db.json');
new TaskController(database).init(process.argv.slice(2));
