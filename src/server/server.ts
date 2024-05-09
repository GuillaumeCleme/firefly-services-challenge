import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { useRoutes } from "./routes";
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express()

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

//Serve static assets
app.use(express.static(path.join(__dirname, 'public')))

//Parse incoming JSON data
app.use(bodyParser.json());

//Enable cors
app.use(cors());

//TODO Setup server auth via a middleware

//Setup all routes
useRoutes(app);

app.listen(3000);

console.log('Server listening on port 3000!')