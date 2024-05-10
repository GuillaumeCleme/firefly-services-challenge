import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE_PATH, setPublicUrl, useRoutes } from "./routes";
import ngrok from '@ngrok/ngrok'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express()

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const DEFAULT_PORT = process.env.EXPRESS_PORT || 3000

//Serve static assets
app.use(express.static(path.join(__dirname, 'public')))

//Parse incoming JSON data
app.use(bodyParser.json({ type: '*/json' }));

//Parse incoming image files and enable binary parsing to /storage endpoints
app.use(bodyParser.raw({ type: (req) => {
    return req.url?.startsWith(`${API_BASE_PATH}/storage`)
}, limit: '50mb' }));

//Enable cors
app.use(cors());

//TODO Setup server auth via a middleware

//Setup all routes
useRoutes(app);

//Setup default port
app.listen(DEFAULT_PORT);
console.log(`Server listening locally on port ${DEFAULT_PORT}!`)



//Setup ingress address if configured
if(process.env.EXPOSE_PUBLIC){
    ngrok.connect({ addr: DEFAULT_PORT, authtoken_from_env: true })
        .then((listener) => {
            //Set public URL for internal reference
            setPublicUrl(listener.url() as string);
            console.log(`Remote ingress established at: ${listener.url()}`)
        });
}
