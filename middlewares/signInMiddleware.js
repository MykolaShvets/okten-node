let {users} = require("../store/store");

module.exports = {
    checkUserAuth: (req, res, next) => {
        try {
            const {email, password} = req.body;
            const accountOwner = users.find(user => user.email === email && user.password === password);

            if (!accountOwner) throw new Error('Wrong email or password!');

            req.accountOwner = accountOwner
            next();
        } catch ({ message }) {
            res.redirect(`/error?error=${message}`);
        }
    }
};