const router = require('express').Router();
const validator = require('express-validator')
const {isUser, isGuest} = require("../middlewares/guards");

router.get('/register', isGuest(),
    (req, res) => {
        res.render('auth/register')
    })
router.post('/register', isGuest(),
    validator.body('email').isEmail().withMessage("Invalid email!")
        .bail()
        .matches(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/i).withMessage("Email can contains only english letters and digits."),
    validator.body('username')
        .isLength({min: 3, max: 25}).withMessage("Username must be between 3 and 25 symbols!"),
    // .bail() Use to chain validations
    validator.body('password')
        .isLength({min: 5}).withMessage("Password must be at least 5 chars length")
        .bail()
        .matches(/^[a-zA-Z0-9]+$/i).withMessage("Password can contains only english letters and digits."),
    validator.body('rePassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords don't match")
            }

            return true
        }),
    async (req, res) => {
        // this is for take validation errors
        try {
            const {errors} = validator.validationResult(req);
            if (errors.length > 0) {
                let join = errors.map(e => e.msg).join("\n");
                throw new Error(join)
            }

            const userData = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                bookedHotels: [],
                offeredHotels: [],
            }

            await req.auth.register(userData);
            res.redirect('/auth/login');
        } catch (err) {
            let errors = err.message.split("\n");
            const ctx = {
                errors,
                userData: {
                    username: req.body.username,
                    email: req.body.email
                }
            }
            console.log(ctx);
            console.error(err);
            res.render('auth/register', ctx);
        }

    })

router.get('/login', isGuest(),
    (req, res) => {
        res.render('auth/login')
    })

router.post('/login', isGuest(),
    async (req, res) => {
        try {
            const {errors} = validator.validationResult(req);
            if (errors.length > 0) {
                let join = errors.map(e => e.msg).join("\n");
                throw new Error(join)
            }

            await req.auth.login(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            let errors = err.message.split("\n");
            const ctx = {
                errors,
                userData: {
                    username: req.body.username
                }
            }

            res.render('auth/login', ctx);
        }
    })

router.get('/logout', isUser(),
    (req, res) => {
        req.auth.logout();
        res.redirect('/');
    }
)

module.exports = router;