module.exports = function(app, shopData) {
    
    const { check, validationResult } = require('express-validator');
    
    const redirectLogin = (req, res, next) => {
        if (!req.session.userId ) {
        res.redirect('./login')
        } else { next (); }
        }
        
    // Handle our routes
    
    //Index Page -----------------------------------------------------------------------
    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });
    
    //About Page -----------------------------------------------------------------------
    app.get('/about', redirectLogin,function(req,res){
        res.render('about.ejs', shopData);
    });

    //Search + Search Results Page -----------------------------------------------------------------------
    app.get('/search', redirectLogin,function(req,res){
        res.render("search.ejs", shopData);
    });
    app.get('/search-result', function (req, res) {
        //searching in the database
        //res.send("You searched for: " + req.query.keyword);
        let sqlquery = "SELECT * FROM books WHERE name LIKE '%" + req.query.keyword + "%'"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("list.ejs", newData)
        });        
    });

    //Register + Registered Page -----------------------------------------------------------------------
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });                                                                                                 
    app.post('/registered', [check('email').isEmail()], function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        res.redirect('./register'); }
        else {
            // Password Hashing
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const plainPassword = req.body.password;

        // saving data in database
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
            let sqlquery = "INSERT INTO users (username, firstname, lastname, email, hashedpassword) VALUES (?, ?, ?, ?, ?)";
            let newrecord = [req.body.username, req.body.firstname, req.body.lastname, req.body.email, hashedPassword];
            
            db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            else
            var result = 'Hello '+ req.body.firstname + ' '+ req.body.lastname +' you are now registered! We will send an email to you at ' + req.body.email;
            result += ' Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword;
            res.send(result);
            })
        })
    }});

    //List Books Page -----------------------------------------------------------------------
    app.get('/list', redirectLogin, function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("list.ejs", newData)
        });
    });

    //List Users Page -----------------------------------------------------------------------
    app.get('/listusers', redirectLogin, function(req, res) {
        let sqlquery = "SELECT * FROM users"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {registeredUsers:result});
            console.log(newData)
            res.render("listusers.ejs", newData)
        });
    });

    //Add Book + Book Added Page -----------------------------------------------------------------------
    app.get('/addbook', redirectLogin, function (req, res) {
        res.render('addbook.ejs', shopData);
    });
    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            else
            res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price);
        });
    });

    //Bargain Books Page -----------------------------------------------------------------------
    app.get('/bargainbooks', redirectLogin, function(req, res) {
        let sqlquery = "SELECT * FROM books WHERE price < 20";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("bargains.ejs", newData)
        });
    }); 

    //Login + Logged In Page -----------------------------------------------------------------------
    app.get('/login', function (req,res) {
        res.render('login.ejs', shopData);                                                                     
    });
    app.post('/loggedin', function (req,res) {
        const bcrypt = require('bcrypt');
        const username = req.body.username;
        const password = req.body.password;

        //Checking Username Within Database
        let checkUsernameSQL = "SELECT Username FROM users WHERE Username = '" + username + "'";
        db.query(checkUsernameSQL, (err, result) => {
            if (err) {
                // TODO: Handle error
                res.redirect('./');
                res.send('Incorrect Username');
                console.log('SQL Query Error')
            }
            let checkedUsername = result[0].Username
            console.log(checkedUsername)
            
            //Getting Hashed Password From Database
            let hashedPasswordSQL = "SELECT HashedPassword FROM users WHERE Username = '" + username + "'";
            db.query(hashedPasswordSQL, (err, result) => {
                if (err) {
                    // TODO: Handle error
                    res.redirect('./'); 
                    console.log('SQL Query Error')
                }
                let hashedPassword = result[0].HashedPassword
                console.log(hashedPassword)
                
                // Compare the password supplied with the password in the database
                bcrypt.compare(password, hashedPassword, function(err, result) {
                    if (err) {
                            // TODO: Handle error
                            res.redirect('./'); 
                            console.log('SQL Error')
                        }
                        else if (result == true) {
                            // Save user session here, when login is successful
                            req.session.userId = req.body.username;
                            res.send('Logged In');
                            console.log('Logged In');
                        }
                        else {
                            // TODO: Send message
                            res.send('Wrong Password or Username');
                            console.log('Wrong Password or Username');
                        }
                    });
                });
            });
        });

        //Logout Page -----------------------------------------------------------------------
        app.get('/logout', redirectLogin, (req,res) => {
            req.session.destroy(err => {
            if (err) {
            return res.redirect('./')
            }
            res.send('you are now logged out. <a href='+'./'+'>Home</a>');
        })
    });

        //Delete Users Page -----------------------------------------------------------------------
        app.get('/deleteuser', redirectLogin, function (req,res) {
            res.render('deleteuser.ejs', shopData);                                                                     
        });
        app.post('/deleteduser', function (req,res) {
            //SQL to delete a User based on what the User typed
            let deleteUserSQL = "DELETE FROM users WHERE Username = '" + req.body.username + "'";
            console.log(deleteUserSQL)
            db.query(deleteUserSQL, (err, result) => {
                if (err) {
                    // TODO: Handle error
                    console.log('SQL Query Error')
                }
                let deleteuser = result
                console.log(deleteuser)
                res.send('User: (' + req.body.username + ') was successfully deleted');
                        console.log('User Delete Successful');
            });
        });
    }