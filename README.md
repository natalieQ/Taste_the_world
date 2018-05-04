## Taste_the_world is recipe sharing website that also features dynamic data visualization

## Note: PLEASE RUN recipe-seeder.js FILE UNDER seed FOLDER FIRST before testing the website

## Project Features

    * MEAN stack web application
    * Implemented RESTful routes (GET, POST, PUT, DELETE http requests) that let users to create, edit and delete recipe posts.
    * Users can also like / dislike recipe posts. This feature updates MongoDB database through query requests at real time.
    * Added auth guard for routes. User can only view recipes after they logged in 
    * if users try to access unauthorized route. Alert message will be shown, and then users will be navigated to login page.
    * User authentication is handled through storing token in user local storage. Each http requests will get token from the local storage and add it to header as a way to check if user is logged in
    * Implemented flash-message when user logs out, then it will navigate user to the homepage.
    * User input for registration / login is verified both in the front end and back end using regular expression
    * Multiple username is forbidden. It is realized through making query to the database at backend (user information is stored in database) 
    * Uses Angular as front end framework and renders html page with the help of Angular directives (i.e. ngFOR, ngIF, ngModle)
    * Front end is organized as components within Angular framework. For example: navigation bar is a component that is embedded on all webpages.
    * View recipes web page is rendered in that way that the most recent post is at the very beginning. It is implemented through sorting recipe's data_created information from database.
    * Recipe origin information is dynamically rendered as users change their recipe posts. Every time the dashboard page is reloaded, it will make query request to database and then dynamically update the pie-chart using the current data status from the database


## Next step 

    * Replace the current "pie-chart" with a "world map" layout for recipe data visualization
