Use the README to:


In my Recipe Buddy I have implemented the following feaures:

- Home page that displays the name of the web application and a navigation bar that contains links to other pages.
(index.ejs)

- About page that displays information about the web application including my name as the developer and a navigation bar that contains links to other pages.
(about.ejs)

- Register page that displays a form for users to add a new user to the database. The form contains the following items: first name, last name, email address, username, and password. Also a navigation bar that contains links to other pages is displayed. The password is hashed when stored and a message is displayed indicating that add operation has been done.
(register.ejs)

- Login page that displays a form for users to login using their username and password. Users are logged in if and only if both username and password are correct and a message is displayed indicating whether login is successful or not and why not successful.
(login.ejs)

- Logout - There is a way to logout, a message is displayed upon successful logout.

- Add food page (only available to logged-in users) that displays a form for users to add a new food item to the database. 

The following are in the form:

Name: flour
Typical values per:100
Unit of the typical value: gram
Carbs: 81 g
Fat: 1.4 g
Protein: 9.1 g
Salt: 0.01 g
Sugar: 0.6 g

The inputs are stored in the database upon submission. I have also saved the username of the user who has added this food item to the database.
(foodadd.ejs)

- Search food page 

R7A: Display a form to users to search for a food item in the database. 'The form should contain just one field - to input the name of the food item'. Display a link to the home page or a navigation bar that contains links to other pages.

R7B:  Collect form data to be passed to the back-end (database) and search the database based on the food name collected from the form. If food found, display a template file (ejs, pug, etc) including data related to the food found in the database to users. Display a message to the user, if not found.

R7C: Going beyond, search food items containing part of the food name as well as the whole food name. As an example, when searching for ‘bread’ display data related to ‘pitta bread’, ‘white bread’, ‘wholemeal bread’, and so on. [6 marks]

- Update food page (only available to logged-in users)

R8A: Display search food form. Display a link to the home page or a navigation bar that contains links to other pages.

R8B: If food found, display all data related to the food found in the database to users in forms so users can update each field. Display a message to the user if not found. Collect form data to be passed to the back-end (database) and store updated food items in the database. Display a message indicating the update operation has been done. 

You can go beyond this requirement by letting ONLY the user who created the same food item update it. [3 marks]

R8C: Implement a delete button to delete the whole record, when the delete button is pressed, it is good practice to ask 'Are you sure?' and then delete the food item from the database, and display a message indicating the delete has been done. 

You can go beyond this requirement by letting ONLY the user who created the same food item delete it. [3 marks]

- List food page (available to all users)

R9A: Display all fields for all foods stored in the database. Display a link to the home page or a navigation bar that contains links to other pages.

R8B: You can gain more marks for your list page is organised in a tabular format instead of a simple list.

R9C: going beyond by letting users select some food items (e.g. by displaying a checkbox next to each food item and letting the user input the amount of each food item in the recipe e.g. 2x100 g flour). Then collect the name of all selected foods and calculate the sum of the nutritional information related to all selected food items for a recipe or a meal and display them as ‘nutritional information of a recipe or a meal’. Please note, it is not necessary to store recipes or meals in the database. [6.5 marks]

- API
There is a basic API displayed on '/api' route listing all foods stored in the database in JSON format. i.e. food content can also be accessed as JSON via HTTP method, It should be clear how to access the API (this could include comments in code). Additional credit will be given for an API that implements get, post, put and delete.

Recipe Buddy ERD
![Alt text](/documentation/ERD.png "Recipe Buddy ERD")