module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals = {User : req.user};
        return next();
    }
    return res.redirect('/login');
}