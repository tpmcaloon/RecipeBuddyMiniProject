module.exports = function(app, shopData) {
    
    const { check, validationResult } = require('express-validator');
    
    const redirectLogin = (req, res, next) => {
        if (!req.session.userId ) {
            res.redirect('./login')
        }
        else{
            next (); }
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
    app.get('/foodsearch', redirectLogin,function(req,res){
        res.render("foodsearch.ejs", shopData);
    });
    app.get('/search-result', function (req, res) {
        //searching in the database
        let sqlquery = "SELECT * FROM foods WHERE FoodName LIKE '%" + req.query.keyword + "%'"; // query database to get all the foods
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./')
            }
            let newData = Object.assign({}, shopData, {availableFoods:result});
            res.render("foodlist.ejs", newData)
        });        
    });

    //Search + Update Foods Page -----------------------------------------------------------------------
    app.get('/foodupdate', redirectLogin, function(req, res) {
        let sqlquery = "SELECT * FROM foods"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableFoods:result});
            console.log(newData)
            res.render("foodupdate.ejs", newData)
        });
    });
    app.post('/foodupdated', function (req, res) {
        //searching in the database
        let updatedrecord = [req.sanitize(req.body.name), req.sanitize(req.body.typicalvaluesper), req.sanitize(req.body.unitofthetypicalvalue), req.sanitize(req.body.carbs), req.sanitize(req.body.fat), req.sanitize(req.body.protein), req.sanitize(req.body.salt), req.sanitize(req.body.sugar)];
        let sqlquery = "UPDATE foods SET TypicalValuesPer = '%" + req.body.typicalvaluesper + "%', UnitOfTheTypicalValue = '%" + req.body.unitofthetypicalvalue + "%', Carbs = '%" + req.body.carbs + "%', Fat = '%" + req.body.fat + "%', Protein = '%" + req.body.protein + "%', Salt = '%" + req.body.salt + "%', Sugar = '%" + req.body.sugar + "%' WHERE FoodName = '%" + req.body.name + "%';"
        // execute sql query
        db.query(sqlquery, updatedrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            else
            res.send(' This food has been updated in the database -'
            + '<br>' + ' Name: '+ req.sanitize(req.body.name)
            + '<br>' + ' Typical Values Per: '+ req.sanitize(req.body.typicalvaluesper)
            + '<br>' + ' Unit: ' + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Carbs: '+ req.sanitize(req.body.carbs)
            + '<br>' + ' Fat: '+ req.sanitize(req.body.fat)
            + '<br>' + ' Protein: '+ req.sanitize(req.body.protein)
            + '<br>' + ' Salt: '+ req.sanitize(req.body.salt)
            + '<br>' + ' Sugar: '+ req.sanitize(req.body.sugar)
            + '<br>' + ' Return to <a href='+'./'+'>Home</a>');
        });
    });
    
    //Delete Users Page ----------------------------------------------------------------------------------------------------------
    app.get('/fooddelete', redirectLogin, function (req,res) {
        res.render('fooddelete.ejs', shopData);                                                                     
    });
    app.post('/fooddeleted', function (req,res) {
        //SQL to delete Food
        let deleteFoodSQL = "DELETE FROM foods WHERE FoodName = '" + req.sanitize(req.body.foodname) + "'";
        console.log(deleteFoodSQL)
        db.query(deleteFoodSQL, (err, result) => {
            if (err) {
                // TODO: Handle error
                console.log('SQL Query Error')
            }
            let deletefood = result
                console.log(deletefood)
                res.send('Food: (' + req.sanitize(req.body.foodname) + ') was successfully deleted. <a href='+'./'+'>Home</a>');
                console.log('Food Delete Successful');
            });
        });
    
    //Register + Registered Page -----------------------------------------------------------------------
    app.get('/register',function(req, res) {
        res.render('register.ejs', shopData)
    });
    app.post('/registered', 
    [check('email', 'Your email is not valid').not().isEmpty()], 
    [check('password', 'The password must be 8+ chars long and contain a number')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 8 })
    .matches(/\d/)],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.redirect('./register'); 
            }
            else {
                // Password Hashing
                const bcrypt = require('bcrypt');
                const saltRounds = 10;
                const plainPassword = req.sanitize(req.body.password);
                // saving data in database
                bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
                    let sqlquery = "INSERT INTO users (username, firstname, lastname, email, hashedpassword) VALUES (?, ?, ?, ?, ?)";
                    let newrecord = [req.sanitize(req.body.username), req.sanitize(req.body.firstname), req.sanitize(req.body.lastname), req.sanitize(req.body.email), hashedPassword];
                    db.query(sqlquery, newrecord, (err, result) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        else
                        var result = 'Hello '+ req.sanitize(req.body.firstname) + ' '+ req.sanitize(req.body.lastname) +' you are now registered! We will send an email to you at ' + req.sanitize(req.body.email);
                        result += ' Your password is: '+ req.sanitize(req.body.password) +' and your hashed password is: '+ hashedPassword + ' <a href='+'./'+'>Home</a>';
                        res.send(result);
                    })
                })
            }
        });
        
    //List Foods Page -----------------------------------------------------------------------
    app.get('/foodlist', function(req, res) {
        let sqlquery = "SELECT Foods.FoodName, Foods.TypicalValuesPer, Foods.UnitOfTheTypicalValue, Foods.Carbs, Foods.Fat, Foods.Protein, Foods.Salt, Foods.Sugar, Users.Username FROM Users INNER JOIN Foods ON Users.UserID=Foods.UserID;"; // query database to get all the Foods + User
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableFoods:result});
            console.log(newData)
            res.render("foodlist.ejs", newData)
        });
    });

    //List Users Page -----------------------------------------------------------------------
    app.get('/userlist', redirectLogin, function(req, res) {
        let sqlquery = "SELECT * FROM users"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {registeredUsers:result});
            console.log(newData)
            res.render("userlist.ejs", newData)
        });
    });

    //Add Food + Food Added Page -----------------------------------------------------------------------
    app.get('/foodadd', redirectLogin,
    [check('carbs', 'Must be an Integer').isInt()], 
    function (req, res) {
        res.render('foodadd.ejs',shopData);
    });
    app.post('/foodadded', function (req,res) {
        // saving data in database
        let userquery = "Select UserID From Users";
        db.query(userquery, (err, result) => {
            let userID = result[0].UserID;
            console.log(userID);
            let sqlquery = "INSERT INTO foods (FoodName, TypicalValuesPer, UnitOfTheTypicalValue, Carbs, Fat, Protein, Salt, Sugar, UserID) VALUES (?,?,?,?,?,?,?,?,?)";
            // execute sql query
        let newrecord = [req.sanitize(req.body.name), req.sanitize(req.body.typicalvaluesper), req.sanitize(req.body.unitofthetypicalvalue), req.sanitize(req.body.carbs), req.sanitize(req.body.fat), req.sanitize(req.body.protein), req.sanitize(req.body.salt), req.sanitize(req.body.sugar), userID];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            else
            res.send(' This food has been added to database -'
            + '<br>' + ' Name: '+ req.sanitize(req.body.name)
            + '<br>' + ' Typical Values Per: '+ req.sanitize(req.body.typicalvaluesper) + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Unit: ' + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Carbs: '+ req.sanitize(req.body.carbs) + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Fat: '+ req.sanitize(req.body.fat) + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Protein: '+ req.sanitize(req.body.protein) + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Salt: '+ req.sanitize(req.body.salt) + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + ' Sugar: '+ req.sanitize(req.body.sugar) + req.sanitize(req.body.unitofthetypicalvalue)
            + '<br>' + 'Return to <a href='+'./'+'>Home</a>');
        });
    });
})

    //High Protein Foods Page -----------------------------------------------------------------------
    app.get('/foodhighprotein', redirectLogin, function(req, res) {
        let sqlquery = "SELECT * FROM foods WHERE protein > 10";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, shopData, {availableFoods:result});
            console.log(newData)
            res.render("foodhighprotein.ejs", newData)
        });
    }); 

    //Login + Logged In Page -----------------------------------------------------------------------
    app.get('/login', function (req,res) {
        res.render('login.ejs', shopData);                                                                     
    });
    app.post('/loggedin', 
    [check('password', 'The password must be 8+ chars long and contain a number')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 8 })
    .matches(/\d/)],
    function (req,res) {
        const bcrypt = require('bcrypt');
        const username = req.sanitize(req.body.username);
        const password = req.sanitize(req.body.password);

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
                            req.session.userId = req.sanitize(req.body.username);
                            res.send('You are now Logged In.  Go to <a href='+'./'+'>Home</a>');
                            console.log('Logged In');
                        }
                        else {
                            // TODO: Send message
                            res.send('Wrong Password or Username.  Go to <a href='+'./'+'>Home</a>');
                            console.log('Wrong Password or Username');
                        }
                    });
                });
            });
        });

        //Logout Page ---------------------------------------------------------------------------------------------------------------
        app.get('/logout', redirectLogin, (req,res) => {
            req.session.destroy(err => {
            if (err) {
            return res.redirect('./')
            }
            res.send('You are now Logged Out. Return to <a href='+'./'+'>Home</a>');
        })
    });

        //Delete Users Page ----------------------------------------------------------------------------------------------------------
        app.get('/userdelete', redirectLogin, function (req,res) {
            res.render('userdelete.ejs', shopData);                                                                     
        });
        app.post('/deleteduser', function (req,res) {
            //SQL to delete a User based on what the User typed
            let deleteUserSQL = "DELETE FROM users WHERE Username = '" + req.sanitize(req.body.username) + "'";
            console.log(deleteUserSQL)
            db.query(deleteUserSQL, (err, result) => {
                if (err) {
                    // TODO: Handle error
                    console.log('SQL Query Error')
                }
                let deleteuser = result
                console.log(deleteuser)
                res.send('User: (' + req.sanitize(req.body.username) + ') was successfully deleted. <a href='+'./'+'>Home</a>');
                        console.log('User Delete Successful');
            });
        });
        
        //Get API Page -----------------------------------------------------------------------
        app.get('/api', function (req,res) {
            // Query database to get all the books
            let keyword = req.query.keyword
            let sqlquery = "SELECT * FROM foods"; // query database to get all the books
            let sqlquerykeyword = "SELECT * FROM foods WHERE FoodName LIKE '%" + keyword + "%'"; // query database to get all the books
            
            if (keyword == null){
                // Execute the sql query
                db.query(sqlquery, (err, result) => {
                    if (err) {
                        res.redirect('./');
                    }
                    // Return results as a JSON object
                    res.json(result);
                });
            } else{
                // Execute the sql query
                db.query(sqlquerykeyword, (err, result) => {
                    if (err) {
                        res.redirect('./');
                    }
                    // Return results as a JSON object
                    res.json(result);
                });
            }
        });
            
    }