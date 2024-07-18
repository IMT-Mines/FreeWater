const request = require('supertest');
import {beforeAll, afterAll, describe, test, expect} from 'vitest'
import {startServer} from '../src/express/server'

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

test('/samples', async () => {
    const response = await request(app).post('/samples').send(['84076']);
    expect(response.statusCode).to.be.equal(200);
});