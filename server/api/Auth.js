const router = require('express').Router();
const { User } = require('../db//models');

//Login
router.post('/', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(user => {
            if (!user) {
                const error = new Error();
                error.status = 401;
                throw error;
            }
            //req.session.user = user.uuid;
            if (req.body.rememberme === true) {
                //req.session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
            }
            res.send({uuid: user.uuid});
            //req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000;
        })
        .catch(next);
})

//Get session UUID and return
// router.get('/', (req, res, next) => {
//     if (!req.session.user) {
//         const error = new Error('No user session');
//         error.status = 401;
//         return next(error)
//     }
//     res.send(req.session.user)
// })


module.exports = router;
