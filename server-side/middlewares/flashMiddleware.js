

export const flashMiddleware = (req, res, next) => {
    if (req.session.flash !== undefined) {
        res.locals.flash = req.session.flash;
        req.session.flash = undefined;
    }

    req.flash = (type, message) => {
        if (req.session.flash === undefined) {
            req.session.flash = {};
         }
         req.session.flash[type] = message;
    }
    next();
}