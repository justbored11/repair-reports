//middle ware verify user is authenticated
module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("sessions is :", req.session);
            return next();
        } else {
            req.session.returnTo = req.originalUrl;
            // console.log("session output", req.session.returnTo);
            req.flash("errors", ["please log in to perform action"]);
            res.redirect("/login");
        }
    },
};
