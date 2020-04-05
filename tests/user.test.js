const axios = require('axios');
const URL = 'http://localhost:3000'

test('hello', async () => {
    console.log('Testing is ok');
});

// test('login', async () => {
//     const resp = await axios.post(URL + '/api/login', { email: 'jorge@gmail.com', password: 'jorge' });
// })
test('users', async () => {
    const resp = await axios.get(URL + '/api/users');
})

test('create user', async () => {
    const user = {
        email: 'jlaq@gmail.com',
        password: 'jlaq',
        empresa: 'notaria'
    }

    const resp = await axios.post(URL + '/api/signup', user);
})