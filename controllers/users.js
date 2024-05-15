const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs")
}


module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (error) => {
            if (error) {
                return next(error);
            }
            req.flash("success", "Welcome to RoamRover!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};


module.exports.login = async (req, res) => {
    req.flash("success", "Welcome Back To RoamRover!");
    const redirectUrl = res.locals.originalUrl || "/listings";
    if (redirectUrl) {
        return res.redirect(redirectUrl);
    }
    req.flash("error", "something went wrong!");
};



module.exports.logout = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        req.flash("success", "You are successfully logged out!");
        res.redirect("/listings");
    });
}