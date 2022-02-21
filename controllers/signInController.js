
module.exports = {
    renderForm: (req, res) => {

        res.render('signIn');

    },

    signIn: ({accountOwner}, res) => {

        res.redirect(`/users/${accountOwner.id}`);

    }
}