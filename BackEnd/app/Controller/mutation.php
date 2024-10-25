<?php

namespace App\Controller;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Model\Order; // Import the Order model
use PDO;

class GraphQLMutation {
    public static function getMutationType($pdo) {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'addOrder' => [
                    'type' => Type::string(), // Return order ID
                    'args' => [
                        'product_id' => Type::nonNull(Type::string()),
                        'quantity' => Type::nonNull(Type::int()),
                        'customer_id' => Type::nonNull(Type::int())
                    ],
                    'resolve' => function($root, $args) use ($pdo) {
                        // Insert order into DB using the Order model
                        $order = new Order($pdo);
                        $orderId = $order->createOrder($args['product_id'], $args['quantity'], $args['customer_id']);
                        return $orderId; // Return the order ID
                    }
                ]
            ]
        ]);
    }
}
