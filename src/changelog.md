|2022.11.05. - ver. 1

- Database up and running with 100 handpicked products on Firebase, using realtime database linked with storage
- Added responsive cards with banner images, titles and prices
- Random flash sales occur every 5 minutes with notification badges
- Hovering a game card will start playing a video loop of selected game

|2022.11.06. - ver. 1.05-1.10

- Added sale pipe for calculating the original price and display it besides the discounted price
- Updated catId keys for all database items in preparation of filters.

Additional changes:

- Added onSale key for all database items for better discount display and filtering options, updated product model
- Changed randomizer logic for discount calculations to be more realistic
- Added filtering component with dropdown menus, checkboxes and a search field
- Added multiple filtering options / pipes (by name, by genre, by price, by discount) - genre and price still needs finetuning
- Added bootstrap scripts to angular.json for dropdown logic
- Removed content from app.component, moved it to home.component
- Removed spec files from pipes for better visibility

|2022.11.07. - ver. 1.15

- Minor changes to visuals (changed favicon, menu colors)
- Added category model
- Added additional filtering checkbox for Free To Play games
- Finetuned and fixed logic for all filters

Additional changes:

- Moved fetch logic to ProductService
- Cat01 Cat02 got replaced by Features and Sales (routerlinks updated)

|2022.11.08. - ver. 1.20

- API url got moved to environment variables
- ProductService got fixed, so fetched data displays properly (only subscribing in components)
- Added option to add games to cart for cards
- Started working on modal with detailed game information and additional purchase option
- A shopping cart is now displayed in the navbar (not yet functional)
- Started working on featured and sales components

Additional Changes:

- Featured component work in progress

|2022.11.09. - ver. 1.25

- Added product-card, product-list, product-slider components, moved content around
- Featured page now features a random game genre with 5 randomly selected titles up top and all the rest in the category below
- Sales page is WIP
- Fixed filter-by-price warnings, added select5 pipe to select five random items from any array
- Added patch request to the product service to keep database up to date with local files each time there are new sales generated
- Game catId-genre idetifier got moved to models, as it is now used in two different components for filtering purposes

|2022.11.10. - ver. 1.30

- Added admin page with login functionality
- Added full CRUD functionality to ProductService
- Admin page displays all data from server, with options for adding new games, editing and deleting existing ones
- Product-card carousel is WIP

Additional Changes

- CRUD functionality linked to Admin table - admin can now add new games and delete, or update existing ones
- Validation for create and update requests is WIP

|2022.11.12. - ver. 1.35

- Clicking product cards opens up a modal with detailed information and option to add selected item to cart
- Cart badge and price updates on each product 'purchase'
- Opening the cart allows the user the remove all items from the cart
- Refined filter bar for better responsivity
- Minor changes to shopping cart and filter visuals

|2022.11.13. - ver. 1.35

- Product-card carousel is added on "Featured"
- Changed visuals all around the site, lots of visual and logical micro-management
- Product cart now displays all added items
- Carousel modal positioning is WIP

|2022.11.14. - ver. 1.40

- Sales page now features 3 random genres with max 5 of the top discounted games in that genre
- Discounts are now kept between components, only refreshes every 5 minutes

Additional changes

- Card carousel optimized
- Minor visual changes
- Added sort by headers to Admin table

|2022.11.16. - ver. 1.40

- Added input validation for Admin table
- Added, edited, deleted games directly affect game cards now
- Minor bugfix with shopping cart

|2022.11.17. - ver. 1.40

- Added pagination to Admin table with 10 products/page
- Added all filtering options to Admin table

|2022.11.19. - ver. 1.40

- Added alternative "Show All Games" toggler checkbox for pagination on Admin page, that lists all available database records
- Added emojis for filter options

|2022.11.21. - ver. 1.45

- Last minute bugfixes on Admin page

Short documentation of this application:

This mini demo webshop is hosting a video game library with 100 popular titles within the gaming community. Backend solution is realized with the use of a Firebase realtime database with an additional storage for the banner images.

On the 'Home' page every game card has a banner image displayed with the most important information below such as game title and price, in case of an ongoing sale, discount price. All cards have an extra hovering action which starts playing a short video loop. At initialization and every 5 minutes there are random flash sales occuring, that are also visibly displayed on badges. The cards also host a small arrow icon in the bottom right corner which navigates the user to a modal window with detailed information of the selected game and option to add it to the shopping cart. The shopping cart is added on the top right corner of the page in the navbar section. It features a price tracker and a mini badge with an item counter that represents games currently added to the cart. Opening the cart lets the user see which products they had previously added, listed with banners, titles and prices. The empty cart button can be used to delete all products from the cart. The page also has a multi filter with options to narrow down the game list by genres, prices, free games, discounts and title search.

The 'Featured' page hosts (max.) 5 randomly selected game in a stacked card carousel from a randomly generated game genre, and then displays the rest of the games in said category below.

Opening the 'Sales' page randomly chooses 3 of the game categories with at least one in each currently being discounted and displays maximum 5 of them in a descending order starting from the greatest discount.

The 'Admin' page requires the user to login first in order to access the administrative table that lets them access the database, add new games or edit, delete existing ones. This tab features a pagination component with 10 games per page, with the same filtering options as on the home page. Each input field has unique validation and error messages displayed in case of invalid input. All CRUD funtionality is directly affecting the game information on all pages.
