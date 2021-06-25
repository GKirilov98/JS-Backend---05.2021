const {isUser} = require("../middlewares/guards");
const router = require('express').Router();
router.get('/profile', isUser(),
    async (req, res) => {
        let id = req.user._id;
        let user = await req.auth.getUserById(id);
        let bookedHotels = user.bookedHotels.map (e => e.name).join(", ");
        const ctx ={
            username: user.username,
            email: user.email,
            bookedHotels
        }
        res.render('user/profile', ctx )
    })

module.exports = router;