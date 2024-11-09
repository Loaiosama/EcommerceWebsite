<?php

namespace app\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemSchema {
    public static function getAttributeItemSchema() {
        return new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'display_value' => ['type' => Type::string()],
                'value' => ['type' => Type::string()],
            ],
        ]);
    }
}
