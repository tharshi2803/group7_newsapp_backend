const bcrypt = require('bcryptjs');
const users = [
    {
        name: 'Brain H. Landry',
        email: 'brain@gmail.com',
        password: bcrypt.hashSync('123456'),
        avatar: 'https://i.ibb.co/SNN7JCX/team-6.jpg',
    },
    {
        name: 'Thomas',
        email: 'thomas@gmail.com',
        password: bcrypt.hashSync('123456'),
        avatar: 'https://i.ibb.co/d294W8Y/team-4.jpg'
    },
    {
        name: 'Danielle R. Martin',
        email: 'danielle@gmail.com',
        password: bcrypt.hashSync('123456'),
        avatar: 'https://i.ibb.co/ZTWbx5z/team-1.jpg'
    },
];

module.exports = users;
