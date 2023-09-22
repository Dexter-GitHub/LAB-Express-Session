var db = require('./db');

module.exports = function (app) {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    /* 로그인 성공시 콜백 */
    passport.serializeUser(function (user, done) {
        console.log('serializeUser', user);
        done(null, user.id);
    });
    /* 로그인 후 페이지 이용시 지속 호출 */
    passport.deserializeUser(function (id, done) {
        var user = db.get('users').find({id:id}).value();
        console.log('deserializeUser', id, user);
        done(null, user);
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd'
        },
        function (email, password, done) {
            console.log('LocalStrategy', email, password);
            var user = db.get('users').find({email:email, password:password}).value();

            if (user) {
                return done(null, user, {
                    message: 'Welcome.'
                });
            }
            else {
                return done(null, false, {
                    message: 'Incorrect user infomation.'
                });
            }
        }
    ));

    return passport;
}