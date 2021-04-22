const request = require('supertest');
const db = require('../data/db-config');
const server = require('./server');

const cornFlakes = { cereal_name: 'Corn Flakes' };
const frostedFlakes = { cereal_name: 'Frosted Flakes' };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('cereals').truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('server.js', () => {
  it('sanity check', () => {
    expect(3).toEqual(3);
  });
  describe('[GET] /api/cereals', () => {
    it('responds with status 200 OK', async () => {
      const res = await request(server).get('/api/cereals');
      expect(res.status).toEqual(200);
    });
    it('returns the right amount of cereals', async () => {
      let res;

      await db('cereals').insert(cornFlakes);
      res = await request(server).get('/api/cereals');
      expect(res.body).toHaveLength(7);

      await db('cereals').insert(frostedFlakes);
      res = await request(server).get('/api/cereals');
      expect(res.body).toHaveLength(8);
    });
    it('returns cereals in correct format', async () => {
      await db('cereals').insert(cornFlakes);
      await db('cereals').insert(frostedFlakes);
      const res = await request(server).get('/api/cereals');
      expect(res.body[6]).toMatchObject({ cereal_id: 7, ...cornFlakes });
      expect(res.body[7]).toMatchObject({ cereal_id: 8, ...frostedFlakes });
    });
  });
  describe('[GET] /api/cereals/:cereal_id', () => {
    it('returns proper status code 200', async () => {
      const res = await request(server).get('/api/cereals/1');
      expect(res.status).toEqual(200);
    });
    it('returns cereal with given id', async () => {
      await db('cereals').insert(cornFlakes);
      const res = await request(server).get('/api/cereals/7');
      expect(res.body).toMatchObject({ cereal_id: 7, ...cornFlakes });
    });
  });
  describe('[POST] /api/cereals', () => {
    it('responds with proper status code 201', async () => {
      const res = await request(server).post('/api/cereals').send(cornFlakes);
      expect(res.status).toEqual(201);
    });  
    it('returns newly created cereal in correct format', async () => {
      let res;
      res = await request(server).post('/api/cereals').send(cornFlakes);
      expect(res.body).toMatchObject({ cereal_id: 7, ...cornFlakes });
  
      res = await request(server).post('/api/cereals').send(frostedFlakes);
      expect(res.body).toMatchObject({ cereal_id: 8, ...frostedFlakes });
    });  
  });
  describe('[DELETE] /api/cereals/:cereal_id', () => {
    it('responds with proper status code 200', async () => {
      const res = await request(server).delete('/api/cereals/1');
      expect(res.status).toEqual(200);
    });

    it('returns the deleted object in correct format', async () => {
      await db('cereals').insert(cornFlakes)
      await db('cereals').insert(frostedFlakes);

      let res;
      res = await request(server).delete('/api/cereals/7');
      expect(res.body).toMatchObject({ cereal_id: 7, ...cornFlakes });
      
      res = await request(server).delete('/api/cereals/8');
      expect(res.body).toMatchObject({ cereal_id: 8, ...frostedFlakes });
    });

  });
});