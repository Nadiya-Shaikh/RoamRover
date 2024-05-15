const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressErr');
const passport = require("passport");
const { isLoggedin, isOwner, validateListing } = require('../middleware.js');
const listingControllers = require("../controllers/listings");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(
        isLoggedin,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControllers.createNewListing));





//new route
router.get('/new', isLoggedin, wrapAsync(listingControllers.renderNewForm));


router.route("/:id")
    .get(
        wrapAsync(listingControllers.showListing))
    .put(
        isLoggedin,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingControllers.updateListing))
    .delete(
        isLoggedin,
        isOwner,
        wrapAsync(listingControllers.deleteListing));


// Edit route
router.get('/:id/edit',
    isLoggedin,
    isOwner,
    wrapAsync(listingControllers.renderEditForm));


module.exports = router;