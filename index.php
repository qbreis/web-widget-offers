<html>
<head>
    <title></title>
    <?php /* To ensure that the JavaScript file is not loaded from cache when included, I can append current timestamp as a query parameter to the URL. This is a common technique to force the browser to fetch the file anew, bypassing any cached versions. */?>
    <script src='http://localhost/web-widget-offers/dist/web_widget_offers.1.0.1.js?<?=time();?>' ></script>
</head>
<body>
    <div id="web-widget-container"></div>
    <script>
    web_widget_offers.initWidget({
        id: 'web-widget-container',
        language: 'es',
        brandColor1: '#000',
        brandColor2: '#000',
        brandColor3: '#6E8B62', 
        brandColor4: '#6E8B62',
        // endpointUrl: 'https://www.karellis-reservation.com/wp-json/api-campings/v2/get_offers',
        endpointUrl: 'http://localhost/leskarellis-2/documents/wp-json/api-campings/v2/get_offers',
        graphqlConfig: {
            endpointURL: 'https://leskarellis.resalys.com/rsl/graphql', // https://leskarellis.resalys.com/rsl/graphiql
            username: 'web_fr',
        },
    });
    </script>
</body>
</html>