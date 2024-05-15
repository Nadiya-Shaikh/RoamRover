const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedin, validateReview, isReviewAuthor } = require('../middleware.js');
const reviewController = require("../controllers/reviews.js");


//Review post(new) route
router.post("/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewController.createReview));

//Review delete route
router.delete("/:reviewId",
    isLoggedin,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));


module.exports = router;
