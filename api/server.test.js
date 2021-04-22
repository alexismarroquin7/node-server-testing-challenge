const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

const luckyCharms = { cereal_name: 'Lucky Charms' };
const frostedFlakes = { cereal_name: 'Frosted Flakes' };

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
  describe('[GET] /api/cereals', () => {
    it('responds with status 200 OK', async () => {
      const res = await request(server).get('/cereals');
      expect(res.status).toEqual(200);
    });
    it('returns the right amount of cereals', async () => {
      let res;

      await db('cereals').insert(luckyCharms);
      res = await request(server).get('/cereals');
      expect(res.body).toHaveLength(1);

      await db('cereals').insert(frostedFlakes);
      res = await request(server).get('/cereals');
      expect(res.body).toHaveLength(2);
    });
    it('returns cereals in correct format', async () => {
      await db('cereals').insert(luckyCharms);
      await db('cereals').insert(frostedFlakes);
      const res = await request(server).get('/cereals');
      expect(res.body[0]).toMatchObject({ cereal_id: 1, ...luckyCharms });
      expect(res.body[1]).toMatchObject({ cereal_id: 2, ...frostedFlakes });
    });
  });
  describe('[POST] /cereals', () => {
    it('responds with proper status code 201', async () => {
      const res = await request(server).post('/cereals').send(luckyCharms);
      expect(res.status).toEqual(201);
    });  
    it('returns newly created cereal in correct format', async () => {
      let res;
      res = await request(server).post('/cereals').send(luckyCharms);
      expect(res.body).toMatchObject({ cereal_id: 1, ...luckyCharms });
  
      res = await request(server).post('/cereals').send(frostedFlakes);
      expect(res.body).toMatchObject({ cereal_id: 2, ...frostedFlakes });
    });  
  });
});