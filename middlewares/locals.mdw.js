module.exports = function(app) {

    app.use(async(req, res, next) => {
        console.log("11233131");
        if (typeof(req.session.isAuthenticated) === 'undefined') {
            req.session.isAuthenticated = false;
        }

        res.locals.isAuthenticated = req.session.isAuthenticated;
        res.locals.authUser = req.session.authUser;
        next();
    })
}