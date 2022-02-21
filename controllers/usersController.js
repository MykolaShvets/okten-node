let {users} = require("../store/store");


module.exports = {
    getAll: ({query}, res) => {

        if (Object.keys(query).length) {
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
    },

    getCurrent: ({params, currentUser}, res) => {

            res.render('currentUser', {currentUser});

    }
};