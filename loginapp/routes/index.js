var express = require('express');
var router = express.Router();
var Application = require('../models/application');

router.get('/', ensureAuthenticated, function(req, res) {
    Application.viewTable(res.locals.user.username, function(err, application) {
        if (err) throw err;
        res.render('applications', { apps: application });
    });
});
router.get('/addApp', ensureAuthenticated, function(req, res) {
    res.render('index');
});

router.get('/test', ensureAuthenticated, function(req, res) {
    // res.redirect('http://www.google.com');

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;