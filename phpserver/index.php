<?php
// Start the PHP built-in server with this script
// Make sure to run: php -S localhost:8000 index.php

// Basic routing
$requestUri = $_SERVER['REQUEST_URI'];

switch ($requestUri) {
    case '/':
        echo "<h1>Welcome to the Home Page</h1>";
        break;

    case '/about':
        echo "<h1>About Us</h1><p>This is the about page.</p>";
        break;

    case '/contact':
        echo "<h1>Contact Us</h1><p>Feel free to reach out!</p>";
        break;

    default:
        http_response_code(404);
        echo "<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>";
        break;
}
?>