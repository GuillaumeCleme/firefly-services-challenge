import { expect, test, describe } from 'vitest';

import { API_BASE_PATH, LOCAL_URL } from '../../../src/server/routes';
import axios from 'axios';

describe('firefly e2e test', () => {
    test('test generateImage', async () => {

        const prompt = "Beautiful cozy fantasy stone cottage in a spring forest aside a cobblestone path and a babbling brook. Stone wall. Mountains in the distance. Magical tone and feel, hyper realistic."

        const results = await axios.post(`${LOCAL_URL + API_BASE_PATH}/firefly/generate`, { prompt, numImages: 1 });

        expect(results.data.outputs).toBeDefined();
        expect(results.data.outputs.length).toBe(1);
        expect(results.data.outputs[0].image.presignedUrl).toBeDefined();
        expect(results.data.outputs[0].image.presignedUrl.startsWith(LOCAL_URL)).toBeTruthy();
    }, 30000)
})

