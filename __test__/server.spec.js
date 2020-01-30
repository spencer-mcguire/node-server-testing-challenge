const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('server', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  // confirm tests are running
  it('runs the tests', () => {
    expect(true).toBe(true);
  });
  // confirm test env
  describe('test env', () => {
    it('should run the testing env', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });
  });
  // check user auth
  describe('GET users', () => {
    it('should return 401 invalid creds', () => {
      return request(server)
        .get('/api/users')
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
  // check creating a new user
  describe('POST register user', () => {
    it('will return 201 on a good request', async () => {
      const mock_user = {
        username: 'DankDaddy01',
        password: 'Som3Dad24!'
      };
      let res = await request(server)
        .post('/api/auth/register')
        .send(mock_user);
      expect(res.status).toEqual(201);
      // use new user to login
      const mock_login = {
        username: 'DankDaddy01',
        password: 'Som3Dad24!'
      };
      // //send the request to login..
      res = await request(server)
        .post('/api/auth/login')
        .send(mock_login);
      // //check that it was a good request...
      expect(res.status).toBe(200);
      // //store the token that the mock gave us
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(12);
    });
  });
});

// salts too big
//jest.setTimeout(1000 * 8);
// set db to testing
//$ knex migrate:latest --env=testing
