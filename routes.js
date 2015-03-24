var checkin = require('./checkin.js'),
    getDetails = require('./getDetails.js'),
    offer = require('./offersPromise.js'),
    register = require('./register.js'),
    del = require('./del.js'),
    groups = require('./groups.js'),
    update = require('./update.js');
    

exports.getRoutes = function(server){
    var users = "/users",
        business = "/business",
        offers = '/offers',
        group = '/groups';
 
   // The way this works by sending a parameter of "business" and looks up how many points to add from couchDB
    server.get({
        path: users + "/test"
    }, function(req, res,next) {
        res.send('works')
        res.end();
    });
    // The way this works by sending a parameter of "business" and looks up how many points to add from couchDB
    server.put({
        path: users + "/checkin"
    }, function(req, res, next) {
        checkin.checkin(req, res, next);
    });
    // Get details for user
    server.get({
        path: users + "/get/:username"
    }, function(req, res, next) {
        getDetails.getDetails(req, res, next, 'users');
    });
    // Get details for business
    server.get({
        path: business + "/get/:businessname"
    }, function(req, res, next) {
        getDetails.getDetails(req, res, next, 'business');
    });
    //Register user
    server.post({
        path: users
    }, function(req, res, next) {
        if(req.authorization.scheme !== 'Basic') {
            return next(new restify.UnauthorizedError('Basic HTTP auth required'));
            failed = true;
        } else {
            register.register(req, res, next, 'users');
        }
    });
    // Register business.
    server.post({
        path: business
    }, function(req, res, next) {
        if(req.authorization.scheme !== 'Basic') {
            return next(new restify.UnauthorizedError('Basic HTTP auth required'));
            failed = true;
        } else {
            register.register(req, res, next, 'business');
        }
    });
    //Update User
    server.put({
        path: users + "/:username"
    }, function(req, res, next) {
        if(req.authorization.scheme !== 'Basic') {
            return next(new restify.UnauthorizedError('Basic HTTP auth required'));
            failed = true;
        } else {
            update.update.updateUser(req, res, next);
        }
    });
    //Update Business
    server.put({
        path: business + "/:businessname"
    }, function(req, res, next) {
        if(req.authorization.scheme !== 'Basic') {
            return next(new restify.UnauthorizedError('Basic HTTP auth required'));
            failed = true;
        } else {
            update.update.updateBusiness(req, res, next);
        }
    });
    // Delete user
    server.del({
        path: users + "/:username"
    }, function(req, res, next) {
        del.del.deleteUser(req, res, next);
    });
    // Delete business
    server.del({
        path: business + "/:businessname"
    }, function(req, res, next) {
        del.del.deletebusiness(req, res, next);
    });
    server.post({
        path: group
    }, function(req, res, next) {
        groups.groups.createGroup(req, res, next);
    });
    server.del({
        path: group + "/:groupname"
    }, function(req, res, next) {
        groups.groups.deleteGroup(req, res, next);
    });
    //?username=username&groupname=test21
    server.get({
        path: group +"/:groupname"
    }, function(req, res, next) {
        groups.groups.showgroup(req, res, next);
    });
    //?username=username&competition=freshers
    server.get({
        path: group
    }, function(req, res, next) {

        groups.showcompetitiongroup(req, res, next);
    });
    //?username=username&groupname=test21
    server.post({
        path: group + "/join/:groupname"
    }, function(req, res, next) {
        groups.groups.joinGroup(req, res, next);
    });
    //Create Offer
    server.post({
        path: business + offers
    }, function(req, res, next) {
        offer.offers.addOffer(req, res, next);
    });
    //Get all Offers
    server.get({
        path: business + offers + '/:businessname'
    }, function(req, res, next) {
        offer.offers.getAllOffers(req, res, next);
    });
    //Redeem Offer
    server.put({
        path: business + offers + '/redeem'
    }, function(req, res, next) {
        offer.offers.redeemOffer(req, res, next);
    }); 
 }
