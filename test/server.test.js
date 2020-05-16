const request = require('supertest');
const app = require('../index');

describe('Go Fit Server API TEST', () => {
  
  test('req.body 는 email 과 password 를 가져야 함', async (done) => {
    const response = await request(app)
    .post('/api/user/login').send({
      email: 'test@gmail.com',
      password: 'test',
    })
    expect(response.status).toEqual(404)
    done();
  })

  test('should create a new daylog', async (done) => {
    const response = await request(app)
    .post('/api/daylog').send({
      userId: 1,
      title: 'test is cool',
    })
    expect(response.status).toEqual(200)
    done();
  })
})
