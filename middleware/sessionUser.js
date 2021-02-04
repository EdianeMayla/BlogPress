function sessionUser(req, res, next){
    res.locals.user = req.session.user;
    res.locals.messages = res.locals.getMessages();
    next();
}

module.exports = sessionUser;