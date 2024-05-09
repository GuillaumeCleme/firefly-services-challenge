import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { useRoutes } from "./routes";
import bodyParser from "body-parser";

const app = express()

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

//Serve static assets
app.use(express.static(path.join(__dirname, 'public')))

//Parse incoming JSON data
app.use(bodyParser.json());

//Setup all routes
useRoutes(app);

app.listen(3000)

console.log('Example app listening on port 3000!')