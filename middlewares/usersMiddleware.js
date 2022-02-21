const {users} = require("../store/store");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            if (!Number.isInteger(+userId) || Number.isNaN(+userId)) {
                throw new Error('Not valid ID!');
            }

            const currentUser = users.find(user => user.id === +userId);

            if (!currentUser) throw new Error(`User with ID: ${userId} exist!`);

            req.currentUser = currentUser;

            next();

        } catch ({ message }) {
            res.redirect(`/error?error=${message}`);
        }
    }
}