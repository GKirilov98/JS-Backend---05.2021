const router = require('express').Router();
router.get('/', async (req, res) => {
    const hotels = await req.storage.getAllHotels();
    const ctx ={
        hotels
    }

    res.render("home/home", ctx)
})

module.exports = router;