<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Model\Product;

class ProductSchema {
    public static function getProductSchema() {
        return new ObjectType([
            'name' => 'Product',
            'fields' => [
                'id' => ['type' => Type::string()],
                'name' => ['type' => Type::string()],
                'inStock' => ['type' => Type::boolean()],
                'description' => ['type' => Type::string()],
                'category' => ['type' => Type::string()],
                'brand' => ['type' => Type::string()],
                'attributes' => ['type' => Type::listOf(Type::string())],
            ],
        ]);
    }
}
