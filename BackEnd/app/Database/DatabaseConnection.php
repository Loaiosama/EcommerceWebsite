<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
require_once __DIR__ . '/../../vendor/autoload.php'; // Autoload dependencies

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// Now you can access the environment variables like this:
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully"; // You can log this instead of echoing in production
} catch (PDOException $e) {
    // Log the error instead of exposing it in production
    error_log("Database connection failed: " . $e->getMessage());
    echo "Connection failed. Please check the logs for details.";
}

error_log("PDO object: " . print_r($pdo, true));


return $pdo;
