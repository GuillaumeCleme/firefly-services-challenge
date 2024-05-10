import { expect, test, describe } from 'vitest';

import { downloadImage, fetchResultsLocally } from "../../../src/server/firefly"
import { API_BASE_PATH, LOCAL_URL, PUBLIC_URL } from '../../../src/server/routes';

describe('firefly service test', () => {
    test('test fetchResultsLocally', async () => {
        const results = await fetchResultsLocally({
            outputs: [
                {
                    seed: '12345',
                    image: {
                        id: '12345',
                        presignedUrl: 'https://placehold.co/600x400/png'
                    }
                }
            ]
        })

        expect(results).toBeDefined()
        expect(results.outputs.length).toBe(1)
        expect(results.outputs[0].image.presignedUrl.startsWith(`${LOCAL_URL + API_BASE_PATH}/storage/get?fileName=`)).toBeTruthy();
    })

    test('test download file', async () => {
        const fileName = await downloadImage('https://placehold.co/600x400/png')

        expect(fileName).toBeDefined()
        expect(fileName).toContain('.png');
    })
})

