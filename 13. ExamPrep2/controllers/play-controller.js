const router = require('express').Router();
const validator = require('express-validator')
const {isUser, isGuest} = require("../middlewares/guards");

router.get("/create", isUser(), (req, res) => {
    res.render('play/create')
});

router.post("/create", isUser(),
    validator.body('title', "Title is required field!").not().isEmpty(),
    validator.body('description', "Description is required field!").not().isEmpty()
        .bail().isLength({max: 50}).withMessage("Description maxlength must be 50 chars."),
    validator.body('imageUrl', "Image URL is required field!").not().isEmpty(),
    async (req, res) => {
        let isPublic = req.body.isPublic !== undefined
        try {
            const {errors} = validator.validationResult(req);
            if (errors.length > 0) {
                let join = errors.map(e => e.msg).join("\n");
                throw new Error(join)
            }
            let data = {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: isPublic,
                owner: req.user._id
            }


            await req.storage.insertOnePlay(data);
            res.redirect('/home');
        } catch (err) {
            let errors = err.message.split("\n");
            const ctx = {
                errors,
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl,
                    isPublic: isPublic
                }
            }
            console.log(ctx);
            console.error(err);
            res.render('play/create', ctx);
        }

    })

router.get("/details/:id", isUser(),
    async (req, res) => {
        try {
            let id = req.params.id;
            let play = await req.storage.findPlayById(id);
            let user = await req.auth.getUserById(req.user._id)
            let isOwner = play.owner.equals(user._id);
            let isLiked = play.usersLiked.filter(e => e._id.toString() == (user._id)).length >= 1
            const ctx = {
                play,
                isOwner,
                isLiked
            }

            res.render('play/details', ctx)
        } catch (e) {
            console.log(e);
            res.redirect("/")
        }

    })

router.get("/like/:id", isUser(),
    async (req, res) => {
        try {
            let id = req.params.id;
            let play = await req.storage.addLikedUserToPlay(id, req.user._id);
            let user = await req.auth.addLikedPlayToUser(req.user._id, id)

            res.redirect('/theaters/details/' + id);
        } catch (e) {
            console.log(e);
            res.redirect("/")
        }

    })
module.exports = router;