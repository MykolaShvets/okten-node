const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


// state
const users = [];
let error = '';
let acauntOwner = null;


// GET
app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/signin', (req, res) => {
    if(acauntOwner){
        res.redirect(`/users/${acauntOwner.id}`);
        return;
    }
    res.render('signIn');
});

app.get('/users',  ({query}, res) => {
    if(Object.keys(query).length){
        let filteredUsers = [...users];
        if (query.age) {
            filteredUsers = filteredUsers.filter(user => user.age === query.age);
        }
        if (query.city) {
            filteredUsers = filteredUsers.filter(user => user.city === query.city);
        }
        res.render('users', {users: filteredUsers});
        return;
    }
    res.render('users', {users});
});

app.get('/users/:userId', ({params}, res) => {

    const currentUser = users.find(user => user.id === +params.userId);
    if(!currentUser){
        error = 'Wrong user ID';
        res.render('error', {error});
        return;
    }
    res.render('currentUser',  { currentUser });
});

app.get('/error', (req, res) => {
    res.render('error', {error});
});


// POST
app.post('/login', (req, res) => {
    const isEmailUnic = users.some(user => user.email === req.body.email);
    if (isEmailUnic) {
        error = 'User with this email already registered';
        res.redirect('/error');
        return;
    }
    users.push({...req.body, id: users.length ? users[users.length - 1].id + 1 : 1});
    res.redirect('/users');
});

app.post('/signin', (req, res) => {
    acauntOwner = users.find(user => user.email === req.body.email && user.password === req.body.password);
    if(!acauntOwner){
        error = 'Wrong email or password. Try again.';
        res.redirect('/error');
        return;
    }
    res.redirect(`/users/${acauntOwner.id}`);
})


app.use((req, res) => {
    res.render('notFound');
});

app.listen(5000, () => {
    console.log('Server has started on PORT 5000');
});


