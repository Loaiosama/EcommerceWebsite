<?php

namespace app\Controller;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use app\Model\Order; 
include_once '../Model/Order.php';

class GraphQLMutation {
    public static function getMutationType($pdo) {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'addOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'product_id' => Type::nonNull(Type::string()), 
                        'name' => Type::nonNull(Type::string()),      
                        'price' => Type::nonNull(Type::float()),   
                        'size' => Type::string(),       
                        'color' => Type::string(), 
                        'capacity' => Type::string(),      
                        'quantity' => Type::nonNull(Type::int())
                    ],
                    'resolve' => function($root, $args) use ($pdo) {
                        
                        $order = new Order($pdo);
                        $orderId = $order->createOrder(
                            $args['product_id'],
                            $args['name'],
                            $args['price'],
                            $args['size'] ?? null,
                            $args['color'] ?? null,
                            $args['capacity'] ?? null,
                            $args['quantity']
                        );
                        return (string) $orderId;
                    }
                ]
            ]
        ]);
    }
}
