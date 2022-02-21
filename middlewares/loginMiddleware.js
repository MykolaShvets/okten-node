const {users} = require("../store/store");

module.exports = {
    isDataValid: (req, res, next) => {
        try {
            const {firstName, lastName, email, password, age, city} = req.body;

            if (firstName.length < 2 || lastName.length < 2) {
                throw new Error('firstName and lastName mast be min 2 sumbols');
            }

            if (!email.includes('@')) {
                throw new Error('Not valid email address!');
            }

            if (password.length < 6) {
                throw new Error('Not valid password');
            }

            if (!age) {
                throw new Error('Not valid age');
            }

            if (!city) {
                throw new Error('Not valid city');
            }

            next();
        } catch ({ message }) {
            res.redirect(`/error?error=${message}`);
        }
    },

    isEmailUnic: ({ body }, res, next) => {
        try {
            const isEmailUnic = users.some(user => user.email === body.email);

            if (isEmailUnic) throw new Error('User with this email already registered')

            next();
        } catch ({ message }) {
            res.redirect(`/error?error=${message}`);
        }
    }
}