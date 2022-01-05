import request from 'supertest';
import usersRouter from './users-routes'

describe('tests of user module routes', () => {
    it('doing users get', async () => {
        const res = await request(usersRouter).get('/users/find')
        console.log(res)
    })
})