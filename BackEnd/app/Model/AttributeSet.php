<?php

namespace app\Model;

use PDO;

class AttributeSet {
    public static function getAttributesByProductId(PDO $pdo, $productId) {
        $stmt = $pdo->prepare("
            SELECT asets.id AS set_id, asets.name AS set_name, aitems.display_value, aitems.value
            FROM attributeset AS asets
            JOIN attributeitems AS aitems ON asets.id = aitems.attribute_set_id
            WHERE asets.product_id = :product_id
        ");
        $stmt->execute(['product_id' => $productId]);

        $attributeData = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $attributes = [];
        foreach ($attributeData as $row) {
            $setId = $row['set_id'];
            if (!isset($attributes[$setId])) {
                $attributes[$setId] = [
                    'name' => $row['set_name'],
                    'items' => []
                ];
            }

            $attributes[$setId]['items'][] = [
                'display_value' => $row['display_value'],
                'value' => $row['value'],
            ];
        }

        return array_values($attributes);
    }
}
