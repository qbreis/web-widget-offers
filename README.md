# Web Widget Offers

This documentation provides an overview of the web widget to display offers based on GraphQL.

This <strong>offers widget</strong> connects to a <strong>WordPress</strong> access point and uses the specific settings for offers in this project ([https://www.karellis-reservation. com](https://www.karellis-reservation.com)) to obtain their availability through a <strong>GraphQL</strong> request to the specific access point ([https://leskarellis. resalys.com/rsl/graphiql](https://leskarellis.resalys.com/rsl/graphiql)), which returns the data in JSON format.

## Project Structure

The project is organized into the following directory structure:

```
/web-widget-offers
├── dist
│   └── web_widget_offers.1.0.1.js
├── versions
│   └── 1.0.1
│       ├── script.js // widget.js: Contains only the main initialization function and any core widget-related logic.
│       ├── graphql // Contains functions related to constructing and handling GraphQL queries.
│       │   ├── graphql.js
│       │   └── graphqlQueries.js
│       ├── lang
│       │   ├── languageManager.js // Translation languages manager.
│       │   └── languages.js // String translations for defined languages.
│       ├── views // Contains  UI-related functions
│       │   ├── htmlBuilder.js // Contains functions for building HTML based on data.
│       │   ├── generateNavCategoriesHtml.js // Contains functions for building HTML nav menu filter dor categories.
│       │   └── carousel.js // Contains functions for initializing the carousel.
│       ├── css
│       │   ├── carousel.css // Contains CSS classes for views/carousel.
│       │   ├── generateNavCategoriesHtml.css // Contains CSS classes for views/generateNavCategoriesHtml.
│       │   └── styles.css // Contains basic general CSS classes for web widget.
│       ├── assets
│       │   └── images
│       └── utils // Utility functions.
│           ├── categoryUtils.js
│           ├── filter.js // Functions needed for utils/proposalsTransform.
│           ├── proposalsTransform.js // function needed in graphql/graphql.
│           ├── utils.js // Custom general functions.
│           ├── handlers.js // Contains functions for data handling and processing functions.
│           └── api.js // Contains functions related to fetching data from APIs.
├── index.html // Example HTML file to demonstrate the use of the web widget.
├── package.json
└── README.md
```

- **/dist**: Contains the compiled JavaScript file for the current version of web widget.

- **/versions/1.0.1**: Contains the version-specific source files for the web widget.

    - **script.js**: Main JavaScript file for the widget.
    - **/css/style.css**: CSS stylesheets for the widget.
    - **/lang/languages.js**: Language strings for internationalization.
    - **index.js**: Main entry point for the widget's JavaScript code.

- **index.html**: Example HTML file to demonstrate the use of the web widget.

## Technologies Used

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
    season: 'summer',
    displayMode: 'grid',
});
</script>
```

- **id**: The ID of the container where the widget will be injected.
- **language**: The language code for the widget's language strings (default is 'es').
- **endpointUrl**: Endpoint to get offers specifics.
- **graphqlConfig**: Any GraphQL configuration settings.
    - **endpointUrl**: Endpoint to get availabilities via GraphQL.
    - **username**: Needed for GraphQL queries.
- **season**: winter | summer | both (default)
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