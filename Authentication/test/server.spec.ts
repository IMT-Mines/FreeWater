const request = require('supertest');
import {beforeAll, afterAll, describe, test, expect} from 'vitest'
import {startServer} from '../src/express/server';

let app;
let server;

beforeAll(async () => {
    let start = startServer();
    await start.server;

    app = start.app;
    server = start.server;
});

afterAll(() => {
    server.close();
});

describe('POST /login', () => {
    test('Expect 200', async () => {
        const username = "TEST";
        const response = await request(app).post('/login').send({ username: username });

        expect(response.status).to.be.equal(200);
    });
});