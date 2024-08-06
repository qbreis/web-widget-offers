# Web Widget Offers

This documentation provides an overview of the web widget to display offers based on GraphQL.

This <strong>offers widget</strong> connects to a <strong>WordPress</strong> access point and uses the specific settings for offers in this project ([https://www.karellis-reservation. com](https://www.karellis-reservation.com)) to obtain their availability through a <strong>GraphQL</strong> request to the specific access point ([https://leskarellis. resalys.com/rsl/graphiql](https://leskarellis.resalys.com/rsl/graphiql)), which returns the data in JSON format.

## Project Structure

The project is organized into the following directory structure:

```
/web-widget-offers
├── dist
│   └── web_widget_offers.1.0.1.js
|
├── versions
│   └── 1.0.1
│       └── Old version, obsolete.
|
├────── 1.0.2
│       ├── index.js // widget.js: Contains only the main initialization function and any core widget-related logic.
│       ├── css
│       │   ├── styles.css // Contains basic general CSS classes for web widget.
│       │   ├── generateNavCategoriesHtml.css // Contains CSS classes for views/generateNavCategoriesHtml.
│       │   ├── modal.css // Contains CSS classes for views/modal.
│       │   └── carousel.css // Contains CSS classes for views/carousel.
│       │
│       ├── graphql // Contains functions related to constructing and handling GraphQL queries.
│       │   ├── graphql.js
│       │   └── graphqlQueries.js
│       │
│       ├── lang
│       │   ├── languageManager.js // Translation languages manager.
│       │   └── languages.js // String translations for defined languages.
│       │
│       ├── views // Contains  UI-related functions
│       │   ├── htmlBuilder.js // Contains functions for building HTML based on data.
│       │   ├── generateNavCategoriesHtml.js // Contains functions for building HTML nav menu filter dor categories.
│       │   ├── carousel.js // Contains functions for initializing the carousel.
│       │   ├── modal.js // Contains functions for initializing the modal.
│       │   ├── buildModalHtml.js // Build the modal content for the selected offer.
│       │   ├── buildAccommodationHtml.js // Builds the html for the accommodation proposal.
│       │   ├── upselling.js // Builds the html to display the upselling offers when the user selects an offer.
│       │   └── crossSelling.js // Builds the html to display the cross-selling offers when the user selects an offer.
│       │
│       ├── assets // Not used at the moment.
│       │   └── images
│       │
│       └── utils // Utility functions.
│           ├── api.js // Contains functions related to fetching data from APIs.
│           ├── handlers.js // Contains functions for data handling and processing functions.
│           ├── proposalsOffersArray.js // This module is used to store the proposalsOffersArray array.
│           ├── optionsOffers.js // This module is used to store the optionsOffers array.
│           ├── getRooms.js // This file is used in ../views/buildAccommodationHtml.js.
│           ├── categoryUtils.js
│           ├── filter.js // Functions needed for utils/proposalsTransform.
│           ├── proposalsTransform.js // function needed in graphql/graphql.
│           ├── utils.js // Custom general functions.
│           └── cookies.js // Handle cookies (check, set, get, delete).
│
├── index.html // Example HTML file to demonstrate the use of the web widget.
├── package.json
└── README.md
```

> Note: The detailed structure may not be up to date with the latest files. The structure is expanding, day by day, maintaining the principles of best practices recommended and described below. This diagram is only used to have a general idea.

- **/dist**: Contains the compiled JavaScript file for the current version of web widget.

- **/versions/1.0.1**: Contains the version-specific source files for the web widget.

    - **script.js**: Main JavaScript file for the widget.
    - **/css/style.css**: CSS stylesheets for the widget.
    - **/lang/languages.js**: Language strings for internationalization.
    - **index.js**: Main entry point for the widget's JavaScript code.

- **index.html**: Example HTML file to demonstrate the use of the web widget.

## Principles of best practices are strongly recommended

1. **Descriptive Variable Names**: 
    - Use meaningful and descriptive names for variables, functions, and methods. 
    - Avoid single-letter names except for loop counters or very short-lived variables.

2. **Short and Focused Functions/Methods**: 
    - Each function should perform a single task or represent a single responsibility.
    - Avoid long functions that try to do too much; break them into smaller, more manageable pieces.

3. **DRY (Don't Repeat Yourself)**: 
    - Avoid duplicating code. If you notice the same code block appearing in multiple places, consider refactoring it into a function or module.

4. **Avoid Globals**:
    - Avoid using global variables as they can lead to hard-to-track bugs and unpredictable behavior.
    - Use shared services or modules to manage state and data. A good example is in `versions\1.0.2\utils\proposalsOffersArray.js` and also in `versions\1.0.2\utils\optionsOffers.js`.

5. **Keep Console Log Clean**:
    - Limit the use of console logs in production code. Use debug flag variables for each module to control debug logging as a practical approach instead.

6. **Clear and Concise Comments**:
    - Write comments to explain why a piece of code exists or what it is supposed to do, especially if it’s not immediately obvious.
    - Avoid redundant comments that do not add value.

## Technologies Used

> I tawt i taw a puddy teact...

The project uses the following technologies:

- **JavaScript**: The main programming language for the widget.
- **Node.js**: A JavaScript runtime environment used for server-side development.
- **Browserify**: A tool that allows the use of Node.js-style require statements in the browser.
- **watchify**: A tool that automatically recompiles JavaScript files using Browserify when changes are detected.
- **CSS**: Stylesheets used to style the widget.
- **HTML**: Markup language used to create the structure of the web page.

## How to Run the Project

To run and compile the project, follow these steps:

1. **Clone the Repository**: Ensure you have permissions to clone the repository. Execute the following command:

```bash
git clone git@github.com:agenciawebsqs/web_widget.git
```

2. **Install Project Dependencies**: Navigate to the project root directory and install the required npm packages by running:

```bash
npm install --save-dev browserify-css
```

3. **Compile the Widget**: Run the following command in the project root directory to compile the widget using Browserify and watchify:

```bash
watchify -t browserify-css versions/1.0.1/index.js --standalone web_widget_offers -o ./dist/web_widget_offers.1.0.1.js
```

4. **Serve the Example HTML**: Open the `index.html` file in a web server environment (e.g., using XAMPP, WAMP, or a built-in server like PHP's built-in server). Ensure the web server points to the project root directory.

5. **Access the Widget**: Open a web browser and navigate to `http://localhost/index.html` to see the web widget in action.

## Widget Initialization

The widget is initialized in the `index.html` file using the following JavaScript code:

```html
<script>
web_widget_offers.initWidget({
    id: 'web-widget-container',
    language: 'fr',
    endpointUrl: 'https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers',
    // endpointUrl: 'http://localhost/leskarellis-2/documents/wp-json/api-campings/v2/get_offers',
    graphqlConfig: {
        endpointUrl: 'https://leskarellis.resalys.com/rsl/graphql', // https://leskarellis.resalys.com/rsl/graphiql
        username: 'web_fr',
    },
    display: {
        mode: 'grid',
        upselling: { // Upselling offers
            active: true, // Show upselling offers. By default, it is set to false
            limit: 30 // Limit of upselling offers. By default, it is set to 30
        },
        crossSelling: { // Cross-selling offers
            active: false, // Show cross-selling offers. By default, it is set to false
            limit: 0 // Limit of cross-selling offers. By default, it is set to 30
        }
    },
    // Name of the cookie to store the session name string to query GraphQL
    sessionCookieName: 'session',
    season: 'summer',
});
</script>
```

- **id**: The ID of the container where the widget will be injected.
- **language**: The language code for the widget's language strings (default is 'es').
- **endpointUrl**: Endpoint to get offers specifics.
- **graphqlConfig**: Any GraphQL configuration settings.
    - **endpointUrl**: Endpoint to get availabilities via GraphQL.
    - **username**: Needed for GraphQL queries.
- **display**: How offers are displayed.
    - **mode**: How offers are displayed, there are two options: grid | carousel.
    - **upselling**: options for the upselling offers.
        - **active**: true / false - Show upselling offers. By default, it is set to false.
        - **limit**: integer > 0 - Limit of upselling offers. By default, it is set to 30.
    - **crossSelling**: options for the cross-selling offers.
        - **active**: true / false - Show cross selling offers. By default, it is set to false.
        - **limit**: integer > 0 - Limit of upselling offers. By default, it is set to 30.
- **sessionCookieName**: Name of the cookie to store the session name string to query GraphQL. By default this name will be just 'session'.
- **season**: NOT FUNCTIONAL YET IN THIS VERSION (winter | summer | both)
- **displayMode**: How offers are displayed, there are two options: grid | carousel.

## How to Adapt for a New Web Widget Version

Before making any changes to a version, depending on the type of change, it may be advisable to make a copy of the most recent version to make the changes. Follow these steps:

1. **Create a New Version**: Create a new directory within `/versions` with the desired version number, e.g., `/versions/1.0.2`.

2. **Copy Existing Files**: Copy the contents of the previous version's directory (`/versions/1.0.1`) to the new directory (`/versions/1.0.2`).

3. **Modify the Files**: Make the necessary modifications to the files within the new version directory.

4. **Update the Example File**: Modify `index.html` to point to the new compiled JavaScript file for the widget:

```html
<script src='http://localhost/web-widget/dist/web_widget.1.0.2.js'></script>
```

5. **Compile the New Widget**: Run the compilation command for the new widget:

```bash
watchify -t browserify-css versions/1.0.2/index.js --standalone web_widget -o ./dist/web_widget.1.0.2.js
```

6. **Test the New Widget Version**: Open `index.html` in the browser to ensure the new widget works correctly.

By following these steps, you can easily adapt the project to create and use a new version of the web widget.

## How to Adapt for a New Initial Web Widget

To adapt this WebWidget starter point for a new Web Widget I can follow the steps:

1. **Clone the Repository**: Ensure you have permissions to clone the repository. Execute the following command:

```bash
git clone git@github.com:agenciawebsqs/web_widget.git web-widget-offers
```

2. **Install dependencies**: run:

```bash
npm install
```

3. **Update the Example File**: Modify `index.html` to point to the new compiled JavaScript file for the widget:

```html
<html>
<head>
    <title></title>
    <script src='http://localhost/web-widget-offers/dist/web_widget_offers.1.0.1.js' ></script>
[...]
    <script>
    web_widget_offers.initWidget({
[...]
```

4. **Clean /dist**: Delete all files in `/dist`.

5. **Compile the Widget**: Run the following command in the project root directory to compile the widget using Browserify and watchify:

```bash
watchify -t browserify-css versions/1.0.1/index.js --standalone web_widget_offers -o ./dist/web_widget_offers.1.0.1.js
```

6. **Serve the Example HTML**: Open the `index.html` file in a web server environment (e.g., using XAMPP, WAMP, or a built-in server like PHP's built-in server). Ensure the web server points to the project root directory.

7. **Access the Widget**: Open a web browser and navigate to `http://localhost/index.html` to see the web widget in action.