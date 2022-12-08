Final app and repo, assessment criteria and submission Instructions
Final App & Repo Assessment

This submission is worth 30% of the term 2 coursework mark i.e.15% of your final grade overall.

    You will be assessed on the submission of a dynamic web application called "Recipe Buddy"
    You should submit two URLs, the URL of your web application and the URL of the GitLab repo, as well as a copy of your main.js file
    You should include a clear statement in the README submitted with the app that describes what you have done and your database design.

Repo

The assessors will check your code, your README file as well as testing your web application.
Recipe Buddy Dynamic Web Application

In this module, you developed a small dynamic web application including routes, forms, and database access. In this assignment, you are tasked with creating another dynamic web application that will function as a digital nutrient monitor. Essentially the dynamic web application interacts with users to calculate and display nutritional facts for their recipes or meals based on food ingredients in the recipe or the meal. 

The user should be given the choice to add nutritional facts for food ingredients and to store them in the database. The web application should provide users with the sum of the different nutrients for a recipe or a meal based on the food ingredients selected by the user to be included in the recipe or the meal. As an example, the user should be able to select the food ingredients for the recipe of ‘apple pie’ by choosing ‘flour’, ‘egg’, ‘butter’, ‘brown sugar’, and ‘apple’ and then the web application retrieves the nutritional facts for each food ingredient and calculates and displays the nutritional facts of the ‘apple pie’ recipe. If a food ingredient is not in the database the user should be given the choice to add it to the database. A full list of the functionalities of the web application is explained in the next sections of this document. Some requirements are ‘base’ requirements to pass the assignment and some requirements are ‘stretch goals’ indicated as ‘going beyond’ and are designed for students who would like to achieve the full mark.
Requirement list

The purpose of the web application is to help people manage their diet by displaying nutritional facts such as, carbs, fat, protein, salt, and sugar in a recipe based on food ingredients in the recipe. The web application provides several functionalities that should meet the following requirements: 

R1: Home page:

R1A: Display the name of the web application.

R1B:  Display links to other pages or a navigation bar that contains links to other pages.

R2: About page: 

R2A: Display information about the web application including your name as the developer. Display a link to the home page or a navigation bar that contains links to other pages.

R3: Register page:

R3A: Display a form to users to add a new user to the database. The form should consist of the following items: first name, last name, email address, username, and password.  Display a link to the home page or a navigation bar that contains links to other pages.

R3B:  Collect form data to be passed to the back-end (database) and store user data in the database. Each user data consists of the following fields: first name, last name, email address, username and password. To provide security of data in storage, a hashed password should only be saved in the database, not a plain password.

R3C: Display a message indicating that add operation has been done.

R4: Login page:

R4A: Display a form to users to log in to the dynamic web application. The form should consist of the following items: username and password.  Display a link to the home page or a navigation bar that contains links to other pages.

R4B: Collect form data to be checked against data stored for each registered user in the database. Users are logged in if and only if both username and password are correct. 

R4C: Display a message indicating whether login is successful or not and why not successful.

R5: Logout

There is a way to logout, a message is displayed upon successful logout.

R6: Add food page (only available to logged-in users):

R6A: Display a form to users to add a new food item to the database. 

Here is an example of a food item, showing the fields that should be on the form and example values:

Name: flour
Typical values per:100
Unit of the typical value: gram
Carbs: 81 g
Fat: 1.4 g
Protein: 9.1 g
Salt: 0.01 g
Sugar: 0.6 g

This is saying that 100 grams of flour has 81g carbs, 1.4g fats, etc.  The unit of the typical value could also be things like litre, tablespoon, cup, etc.
Display a link to the home page or a navigation bar that contains links to other pages.

R6B:  Collect form data to be passed to the back-end (database) and store food items in the database. 

Going beyond by saving the username of the user who has added this food item to the database.

R6C: Display a message indicating that add operation has been done.

R7: Search food page 

R7A: Display a form to users to search for a food item in the database. 'The form should contain just one field - to input the name of the food item'. Display a link to the home page or a navigation bar that contains links to other pages.

R7B:  Collect form data to be passed to the back-end (database) and search the database based on the food name collected from the form. If food found, display a template file (ejs, pug, etc) including data related to the food found in the database to users. Display a message to the user, if not found.

R7C: Going beyond, search food items containing part of the food name as well as the whole food name. As an example, when searching for ‘bread’ display data related to ‘pitta bread’, ‘white bread’, ‘wholemeal bread’, and so on.

R8: Update food page (only available to logged-in users)

R8A: Display search food form. Display a link to the home page or a navigation bar that contains links to other pages.

R8B: If food found, display all data related to the food found in the database to users in forms so users can update each field. Display a message to the user if not found. Collect form data to be passed to the back-end (database) and store updated food items in the database. Display a message indicating the update operation has been done. You can go beyond this requirement by letting ONLY the user who created the same food item update it.

R8C: Implement a delete button to delete the whole record, when the delete button is pressed, it is good practice to ask 'Are you sure?' and then delete the food item from the database, and display a message indicating the delete has been done. You can go beyond this requirement by letting ONLY the user who created the same food item delete it.

R9: List food page (available to all users)

R9A: Display all fields for all foods stored in the database. Display a link to the home page or a navigation bar that contains links to other pages.

R8B: You can gain more marks for your list page is organised in a tabular format instead of a simple list.

R9C: going beyond by letting users select some food items (e.g. by displaying a checkbox next to each food item and letting the user input the amount of each food item in the recipe e.g. 2x100 g flour). Then collect the name of all selected foods and calculate the sum of the nutritional information related to all selected food items for a recipe or a meal and display them as ‘nutritional information of a recipe or a meal’. Please note, it is not necessary to store recipes or meals in the database. 
R10: API
There is a basic API displayed on '/api' route listing all foods stored in the database in JSON format. i.e. food content can also be accessed as JSON via HTTP method, It should be clear how to access the API (this could include comments in code). Additional credit will be given for an API that implements get, post, push and delete.

R11: form validation
All form data should have validations, examples include checking password length, email validation, integer data is integer and etc. 

R12: Your dynamic web application must be implemented in Node.js on your virtual server. The back-end of the web application could be MongoDB or MySQL. Make sure you have included comments in your code explaining all sections of the code including database interactions.

As you can see above, you need your own model (backend data structure), your own operations on that model, and the ability to access those operations through the web and (to some extent) through an API. Your dynamic web application has a database backend that implements CRUD operations (the database can be MySQL or MongoDB)

Detailed criteria for your GitLab repo:

    The name of the project on GitLab must be "myapp"
    There is a readme file in the root of your GitLab repo including the information listed below
    There are comments inserted in the code, separating different parts of the code with a brief explanation of the functionality of the code

README

Include a README.txt file in your repo in the root directory. The README is your chance to tell us what you have worked on and show us what you have learned. Submission with no readme file can not be marked.

Use the README to:

    Highlight what parts of the app the markers should pay attention to i.e. are your work
    You should include a clear statement in the README submitted that describes what YOU have done. Make sure you include the above requirements as well as "filename" and "line number" you have addressed each requirement
    You should include your data model or database schema (Entity Relationship diagram) including names of tables or collections and their fields including primary and foreign keys. If you choose to use MongoDB not SQL make sure you explain your data model in details (including the name of the database, collection names, fields in each collection, references from one collection to the other, if there is any) 
