var express = require('express');
var passport = require('passport');
var router = express.Router();

var Contact = require('../models/contact');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

    // check if the user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

/* Render contact main page. */
router.get('/', requireAuth, function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displayName: ''
            });
        }
    });
});

//render add contact page
router.get('/add', requireAuth, function (req, res, next) {
    res.render('contacts/add', {
        title: 'Contacts',
        displayName: req.user ? req.user.displayName: ''
    });
});

/* process the submission of a new contact */
router.post('/add', requireAuth, function (req, res, next) {
    var contact = new Contact(req.body);
    Contact.create({
        name: req.body.name,
        email: req.body.email,
        cnumber: req.body.cnumber,
        provider: 'local',
        created: Date.now(),
        updated: Date.now()
    }, function (err, Contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

// render the Contact Edit Page
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right contact
    Contact.findById(id, function (err, contact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('contacts/edit', {
                title: 'edit',
                contact: contact,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var contact = new Contact(req.body);
    contact._id = id;
    contact.updated = Date.now();

    // use mongoose to do the update
    Contact.update({ _id: id }, contact, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

/* run delete on the selected contact */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Contact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

function requireAuth(req, res, next){


    if(!req.isAuthenticated()){
        res.redirect('/login');
    }
    next();
}


//make this public
module.exports = router;