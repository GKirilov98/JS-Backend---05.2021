const router = require("express").Router();
const validator = require('express-validator')
const {isUser} = require("../middlewares/guards");


router.get("/create", isUser(), (req, res) => {
    res.render("hotel/create")
});

router.post("/create",
    isUser(),
    validator.body("name", "Name  must be at least 4 symbols long!").isLength({min: 4}),
    validator.body("city", "Name  must be at least 3 symbols long!").isLength({min: 3}),
    validator.body("imageUrl", "Image  url should starts with http or https!").matches(/^(http:|https:).+$/i),
    validator.body("rooms", "Rooms should between 1 and 100!").isInt({min: 1, max: 100}),
    async (req, res) => {

        try {
            const {errors} = validator.validationResult(req);
            if (errors.length > 0) {
                let join = errors.map(e => e.msg).join("\n");
                throw new Error(join)
            }

            const hotelData = {
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: req.body.rooms,
                bookedBy: [],
                owner: req.user._id,
            }

            await req.storage.insertOneHotel(hotelData);
            res.redirect("/")
        } catch (err) {
            let errors = err.message.split("\n");
            const ctx = {
                errors,
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: req.body.rooms,
            }

            res.render('hotel/create', ctx);
        }
    });


router.get("/details/:id", isUser(),
    async (req, res) => {
        let hotelId = req.params.id;
        let userId = req.user._id;
        let hotel = await req.storage.getHotelById(hotelId);
        let isBooked = hotel.bookedBy.filter(e => e == userId).length >= 1;
        let isOwner = hotel.owner == userId;
        const ctx = {
            hotel,
            isBooked,
            isOwner
        }

        res.render("hotel/details", ctx)
    }
)

router.get("/booking/:id", isUser(),
    async (req, res) => {
        let hotelId = req.params.id;
        let userId = req.user._id;
        let hotel = await req.storage.insertBookedByUser(hotelId, userId);

        res.redirect("/hotels/details/" + hotelId)
    })

router.get("/edit/:id", isUser(), async (req, res) => {
    let hotelId = req.params.id;
    let hotel = await req.storage.getHotelById(hotelId);
    res.render('hotel/edit', {hotel});
});

router.post("/edit/:id", isUser(),
    validator.body("name", "Name  must be at least 4 symbols long!").isLength({min: 4}),
    validator.body("city", "Name  must be at least 3 symbols long!").isLength({min: 3}),
    validator.body("imageUrl", "Image  url should starts with http or https!").matches(/^(http:|https:).+$/i),
    validator.body("rooms", "Rooms should between 1 and 100!").isInt({min: 1, max: 100}),
    async (req, res) => {

        try {
            const {errors} = validator.validationResult(req);
            if (errors.length > 0) {
                let join = errors.map(e => e.msg).join("\n");
                throw new Error(join)
            }

            let hotelId = req.params.id;
            let userId = req.user._id;
            const hotelData = {
                name: req.body.name,
                imageUrl: req.body.imageUrl,
                city: req.body.city,
                rooms: req.body.rooms
            }

            await req.storage.editHotel(hotelId, userId, hotelData);
            res.redirect("/hotels/details/" + hotelId)
        } catch (err) {
            let errors = err.message.split("\n");
            const ctx = {
                errors,
                hotel: {
                    name: req.body.name,
                    city: req.body.city,
                    imageUrl: req.body.imageUrl,
                    rooms: req.body.rooms,
                }
            }

            res.render('hotel/edit', ctx);
        }
    }
);

router.get("/delete/:id", isUser(),
    async (req, res) => {
        try {
            let hotelId = req.params.id;
            let userId = req.user._id;
            await req.storage.deleteHotel(hotelId, userId);
        } catch (err) {
            console.log(err);
        }

        res.redirect("/")
    }
)

module.exports = router;
