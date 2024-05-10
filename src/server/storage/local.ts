import fs from 'fs';
import path from "path";

const TEMP_PATH = process.env.TEMP_FILE_PATH || '/tmp';

export const saveLocal = async (fileName: string, buffer: Buffer) => {

    if (!fs.existsSync(TEMP_PATH)) {
        await fs.promises.mkdir(TEMP_PATH, { recursive: true });
    }

    const filePath = path.join(TEMP_PATH, fileName)
    await fs.promises.writeFile(filePath, buffer);

    return filePath;
}