let  express                = require('express'),
     app                    = express(),
     User                   = require('./models/user'),
     flash                  = require('connect-flash'),
     bodyParser             = require('body-parser'),
     catRoute               = require('./routes/cat'),
     userRoute              = require('./routes/user'),
     commentRoute           = require('./routes/comment'),
     methodOverride         = require('method-override'),
     mongoose               = require('mongoose'),
     passport               = require('passport'),
     localPassport          = require('passport-local')

    //connect mongoose
    mongoose.connect('mongodb://localhost:27017/cat_blog',{useNewUrlParser:true,useUnifiedTopology:true});
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    app.set('view engine','ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(methodOverride('_method'));
    app.use(flash());

    //config passport
    app.use(require('express-session')({
        secret: 'all cats do is meow all night',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localPassport(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //config locals
    app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error       = req.flash('error');
        res.locals.success     = req.flash('success');
        next();
    })

 // set up routes
 
    app.use(catRoute);
    app.use(userRoute);
    app.use(commentRoute);

    //fire up server
    app.listen(3000,function(){
        console.log('cat is meow on port 3000 budy');
    })