2022.11.05. - ver. 1

- Database up and running with 100 handpicked products on Firebase, using realtime database linked with storage
- Added responsive cards with banner images, titles and prices
- Random flash sales occur every 5 minutes with notification badges
- Hovering a game card will start playing a video loop of selected game

  2022.11.06. - ver. 1.05-1.10

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

  2022.11.07. - ver. 1.15

- Minor changes to visuals (changed favicon, menu colors)
- Added category model
- Added additional filtering checkbox for Free To Play games
- Finetuned and fixed logic for all filters

Additional changes:

- Moved fetch logic to ProductService
- Cat01 Cat02 got replaced by Features and Sales (routerlinks updated)

  2022.11.08. - ver. 1.20

- API url got moved to environment variables
- ProductService got fixed, so fetched data displays properly (only subscribing in components)
- Added option to add games to cart for cards
- Started working on modal with detailed game information and additional purchase option
- A shopping cart is now displayed in the navbar (not yet functional)
- Started working on featured and sales components
