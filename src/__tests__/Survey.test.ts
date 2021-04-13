import request from 'supertest'
import { app } from '../app'

import createConnection from '../db'

describe('Surveys', () => {
  beforeAll(async() => {
    const conn = await createConnection()
    await conn.runMigrations()
  })

  it('Should not be able to create a new survey without pass title', async() => {
    const resp = await request(app).post('/surveys').send({
      description: 'survey description'
    })

    expect(resp.status).toBe(400)
  })

  it('Should not be able to create a new survey without pass description', async() => {
    const resp = await request(app).post('/surveys').send({
      title: 'survey'
    })

    expect(resp.status).toBe(400)
  })

  it('Should be able to create a new survey', async() => {
    const resp = await request(app).post('/surveys').send({
      title: 'survey',
      description: 'survey description'
    })

    expect(resp.status).toBe(201)
  })

  it('Should be able to get all surveys', async() => {
    await request(app).post('/surveys').send({
      title: 'survey',
      description: 'survey description'
    })

    const resp = await request(app).get('/surveys')
    expect(resp.body.length).toBe(2)
  })
})
