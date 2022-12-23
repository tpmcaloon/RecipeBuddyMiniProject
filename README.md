In my Recipe Buddy I have implemented the following feaures:

- Navigation Bar

- Home page that displays the name of the web application and a navigation bar that contains links to other pages.
(index.ejs)

- About page that displays information about the web application including my name as the developer and a navigation bar that contains links to other pages.
(about.ejs)

- Register page that displays a form for users to add a new user to the database. The form contains the following items: first name, last name, email address, username, and password. Also a navigation bar that contains links to other pages is displayed. The password is hashed when stored and a message is displayed indicating that add operation has been done.
(register.ejs)

- Login page that displays a form for users to login using their username and password. Users are logged in if and only if both username and password are correct and a message is displayed indicating whether login is successful or not and why not successful.
(login.ejs)

- Logout - There is a way to logout, a message is displayed upon successful logout.

- Add food page (only available to logged-in users) that displays a form for users to add a new food item to the database. The inputs are stored in the database upon submission. I have also saved the username of the user who has added this food item to the database. The following are in the input form:

Name: flour
Typical values per:100
Unit of the typical value: gram
Carbs: 81 g
Fat: 1.4 g
Protein: 9.1 g
Salt: 0.01 g
Sugar: 0.6 g
(foodadd.ejs)

- Search food page displays a form for users to search for a food item in the database. I have also made sure that when searching for food items containing part of the food name as well as the whole food name will yield food partially containing the searched keyword.
(foodsearch.ejs)

- Update Food Page (only available to logged-in users) displays a list of foods with inputs to change their values.
(foodupdate.ejs)

- Delete Food Page displays a input field for users to delete food items based on the food name.
(fooddelete.ejs)

- List food page (available to all users) displays all fields for all foods stored in the database. The data is organised in a tabular format instead of a simple list. I have included the checkbox to add food item to meal, however, this is only visual.
(foodlist.ejs)

- High Protein Foods shows food with over 10g of Protein in tabular format
(foodhighprotein.ejs)

- List Users Displays all the users of Recipe Buddy
(userlist.ejs)

- Delete Users allows users to remove other users
(userdelete.ejs)

- API that can be accessed through the naavigation bar
(main.js Lines 305 - 330)

Recipe Buddy ERD
![Alt text](/documentation/ERD.png "Recipe Buddy ERD")

- Issues using the virtual server - When uploading the web app to the virtual server, the navigation bar is off. I was unable to find a solution to this. Below are screenshots of how the application looks on local machines.

![Alt text](/documentation/Home.png "Recipe Buddy Home")
![Alt text](/documentation/About.png "Recipe Buddy About")
![Alt text](/documentation/AddFood.png "Recipe Buddy Add Food")
![Alt text](/documentation/DeleteFood.png "Recipe Buddy Delete Food")
![Alt text](/documentation/DeleteUser.png "Recipe Buddy Delete User")
![Alt text](/documentation/earchFood.png "Recipe Buddy Search Food")
![Alt text](/documentation/ListFood.png "Recipe Buddy List Food")
![Alt text](/documentation/ListUser.png "Recipe Buddy List User")
![Alt text](/documentation/Login.png "Recipe Buddy Login")
![Alt text](/documentation/Register.png "Recipe Buddy Register")
![Alt text](/documentation/UpdateFood.png "Recipe Buddy Update Food")
