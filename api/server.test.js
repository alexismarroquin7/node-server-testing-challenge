const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('cereals').truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe('server.js', () => {
  describe('[GET] /cereals', () => {
    it('responds with status 200 OK', async () => {
      const res = await request(server).get('/cereals');
      expect(res.status).toEqual(200);
    });
  });  
});