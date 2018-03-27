# Taste_the_world

## Progress

## Taste_the_world is a website to let user to add and share food recipes from around the world
## The website features data visualization where users can see their taste profile rendered as map or pie chart

## Current Progress

    # PLEASE RUN recipe-seeder.js FILE UNDER seed FOLDER FIRST

    * Created CRUD routes for recipes
    * After login/register, users can create recipes, edit/delete or view other's recipes 
    * Users can also like / dislike recipes
    * Added auth guard for routes. User can only view recipes when they are logged in 
    * if user try to access uauthorized route. will show alert message, and then take user to the page they viewed before
    * Added flash message when user log out, will take user to homepage

## Next step 

    * for the recipe model, there is a origin field (where the recipe comes from)
    * In next step, I am planning to use D3.js to visualize the origin data in Map format so user can easily see where their recipes are from / or compare to all other users around the world
    * Create a proper homepage for the website
