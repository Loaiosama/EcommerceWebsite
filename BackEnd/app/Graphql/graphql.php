<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Controller\GraphQLQuery;
use App\Controller\GraphQLMutation;
use GraphQL\Type\Schema;
use GraphQL\GraphQL as GraphQLBase;

try {
    $schema = new Schema([
        'query' => GraphQLQuery::getQueryType(),
        'mutation' => GraphQLMutation::getMutationType(),
    ]);

    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $query = $input['query'];
    $variableValues = $input['variables'] ?? null;

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
