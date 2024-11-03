<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1); error_reporting(E_ALL);
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from your frontend origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Specify allowed methods
header("Access-Control-Allow-Headers: Content-Type"); // Specify allowed headers
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/../../vendor/autoload.php';

use app\Controller\GraphQLQuery;
use app\Controller\GraphQLMutation;
use GraphQL\Type\Schema;
use GraphQL\GraphQL as GraphQLBase;

// Get the PDO object from the DatabaseConnection file
$pdo = require_once __DIR__ . '/../Database/DatabaseConnection.php'; // Adjust the path if necessary

// Check if $pdo is valid and connected
if ($pdo instanceof PDO) {
    error_log("PDO object is valid: " . print_r($pdo, true));

    // Optionally, perform a simple query to confirm the connection
    try {
        $result = $pdo->query("SELECT 1"); // A simple query to test the connection
        if ($result) {
            error_log("Database connection is valid.");
        }
    } catch (PDOException $e) {
        error_log("Error executing test query: " . $e->getMessage());
    }
} else {
    error_log("PDO object is not valid.");
}

try {
    // Define your GraphQL schema
    $schema = new Schema([
        'query' => GraphQLQuery::getQueryType($pdo),
        'mutation' => GraphQLMutation::getMutationType($pdo),
    ]);

    // Handle incoming GraphQL requests
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = $input['variables'] ?? null;

    // Execute the query
    $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
    $output = $result->toArray();
} catch (\Throwable $e) {
    $output = [
        'error' => [
            'message' => $e->getMessage(),
        ]
    ];
}

header('Content-Type: application/json');
echo json_encode($output);
