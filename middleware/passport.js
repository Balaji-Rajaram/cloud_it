const helper = require("../api/user/helper");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // Find and fetch user from db
        helper.findById(id)
        .then(user => done(null, user))
        .catch(error => console.log('Error when deserialize the user'));
    });

    let customAuth = (username, password, done) => {

        let user = {
            username: username,
            password: password
        };
        console.log(user)
        // helper function to find admin matches and check password in the db
        helper.viewUserByEmailId(user.username)
        .then(result => {
            if(result) {
                bcrypt.compare(password, result.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        done(null, result);
                    }
                    else {
                    // Password is incorrect
                    done(null, false, { message : "Incorrect Password" });
                    }
                })
            }
            else {
                 // User not found
                done(null, false, { message: "User not found" });
            }
        });
    }

    passport.use("local-login",new LocalStrategy(customAuth));
}
