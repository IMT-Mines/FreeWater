import {beforeAll, afterAll, describe, test, expect} from 'vitest'
import {startServer} from '../src/express/server'
import {fetchSampleFromCity, getAllSamples, getDrinkableScore} from '../src/service/apiSamples'

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

describe('fetchSampleFromCity', () => {
    test('Successful', async () => {
        fetchSampleFromCity('84076').then((response) => {
            expect(response).to.be.an('object');
            expect(response).to.have.keys('cityCode', 'cityName', 'supplier', 'samples');
            expect(response.cityCode).to.be.a('string');
            expect(response.cityName).to.be.a('string');
            expect(response.supplier).to.be.a('string');
            expect(response.samples).to.be.an('array');

            for (const sample of response.samples) {
                expect(sample).to.be.an('object');
                expect(sample).to.have.keys('drinkable', 'name', 'date');
                expect(sample.drinkable).to.be.a('number');
                expect(sample.name).to.be.a('string');
                expect(sample.date).to.be.an.instanceof(Date);
            }
        });
    });

    test('Error', async () => {
        fetchSampleFromCity('-1').then((response) => {
            console.log(response);
            expect(response).to.be.an('object');
        });
    });
});

describe("getAllSamples", () => {
    test('Successful', async () => {
        getAllSamples(['84076']).then((response) => {
            expect(response).to.be.an('array');
        });
    });
});

describe('getDrinkableScore', () => {
    test('Drinkable', async () => {
        let score: number = getDrinkableScore("Eau d'alimentation conforme aux exigences de qualité en vigueur pour l'ensemble des paramètres mesurés.");
        expect(score).to.be.equal(2);
    });

    test('Not drinkable', async () => {
        let score: number = getDrinkableScore("Eau d'alimentation conforme aux limites de qualité et non conforme aux références de qualité.");
        expect(score).to.be.equal(1);
    });
});