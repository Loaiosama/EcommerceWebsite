<?php

namespace app\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSetSchema {
    public static function getAttributeSetSchema() {
        return new ObjectType([
            'name' => 'AttributeSet',
            'fields' => [
                'name' => ['type' => Type::string()],
                'items' => ['type' => Type::listOf(AttributeItemSchema::getAttributeItemSchema())],
            ],
        ]);
    }
}
