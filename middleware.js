const Listing = require('./models/listing');
const Review = require('./models/review');
const { listingSchema, reviewSchema } = require('./schema.js');


const isLoggedin = (req, res, next) => {
    req.session.originalUrl = req.originalUrl;
    if (!req.isAuthenticated()) {
        req.flash("error", "Login Required!!");
        return res.redirect("/login");
    }
    next();
}

const isOriginalUrl = (req, res, next) => {
    if (req.session.originalUrl) {
        res.locals.originalUrl = req.session.originalUrl
    }
    next();
}

const isOwner = async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);
    for (const obj of listing.owner) {
        if (!obj._id.equals(res.locals.currUser._id)) {
            req.flash("error", "Permission Denied! You are not authorized");
            return res.redirect(`/listings/${id}`);
        }
    };
    next();
};


const isReviewAuthor = async (req, res, next) => {
    const { reviewId, id } = req.params;

    const review = await Review.findById(reviewId);

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "Permission Denied! You are not authorized");
        return res.redirect(`/listings/${id}`);
    };
    next();
};




const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};



const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
module.exports = { isLoggedin, isOriginalUrl, isOwner, isReviewAuthor, validateListing, validateReview };