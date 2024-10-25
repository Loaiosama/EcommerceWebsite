<?php

namespace App\Controller;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Schema\ProductSchema;
use App\Schema\CategorySchema;

class GraphQLQuery {
    public static function getQueryType() {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'product' => [
                    'type' => ProductSchema::getProductSchema(),
                    'args' => [
                        'id' => Type::string(),
                    ],
                    'resolve' => function($root, $args) {
                        // Fetch product from DB using Product model
                    }
                ],
                'categories' => [
                    'type' => Type::listOf(CategorySchema::getCategorySchema()),
                    'resolve' => function() {
                        // Fetch categories from DB
                    }
                ]
            ]
        ]);
    }
}
