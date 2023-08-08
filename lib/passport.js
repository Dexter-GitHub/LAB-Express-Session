module.exports = function (app) {
    var authData = {
        email: 'dexter@gmail.com',
        password: '1111',
        nickname: 'Dexter'
    };

    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    /* 로그인 성공시 콜백 */
    passport.serializeUser(function (user, done) {
        done(null, user.email);
    });
    /* 로그인 후 페이지 이용시 지속 호출 */
    passport.deserializeUser(function (id, done) {
        done(null, authData);
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pwd'
        },
        function (username, password, done) {
            if (username === authData.email) {
                if (password === authData.password) {
                    /* 성공시 serializeUser() 호출 */
                    return done(null, authData, {
                        message: 'Welcome.'
                    });
                } 
                else {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
            } 
            else {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
        }
    ));

    return passport;
}