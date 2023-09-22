const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '111111';
const someOtherPlaintextPassword = 'not_bacon';
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    bcrypt.compare(myPlaintextPassword, hash, function(err, result){
        console.log('my password', result);
    });

    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result){
        console.log('other password', result);
    });
});