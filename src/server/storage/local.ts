import fs from 'fs';
import path from "path";

const TEMP_PATH = process.env.TEMP_FILE_PATH || '/tmp';

/**
 * Save a file to local file storage
 * 
 * @param fileName
 * @param buffer 
 * @returns path
 */
export const saveLocal = async (fileName: string, buffer: Buffer) => {

    if (!fs.existsSync(TEMP_PATH)) {
        await fs.promises.mkdir(TEMP_PATH, { recursive: true });
    }

    const filePath = path.join(TEMP_PATH, fileName)
    await fs.promises.writeFile(filePath, buffer);

    return filePath;
}

/**
 * Get a file from local storage
 * @param fileName 
 * @returns buffer
 */
export const getLocal = async (fileName: string) => {
    const filePath = path.join(TEMP_PATH, fileName)
    return await fs.promises.readFile(filePath);
}