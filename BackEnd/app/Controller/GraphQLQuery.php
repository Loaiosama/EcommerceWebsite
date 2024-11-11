<?php

namespace app\Controller;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use app\Schema\ProductSchema;
// use app\Model\Product;
use app\Model\TechProduct;
use app\Model\ClothingProduct;
include_once '../Model/Product.php';
use PDO;

class GraphQLQuery {
    public static function getQueryType($pdo) {
        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'product' => [
                    'type' => ProductSchema::getProductSchema(),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($pdo) {
                        $stmt = $pdo->prepare("SELECT * FROM Product WHERE id = :id");
                        $stmt->execute(['id' => $args['id']]);
                        $productData = $stmt->fetch(PDO::FETCH_ASSOC);

                        if (!$productData) {
                            throw new \Exception("Product not found");
                        }

                        // Determine the product class type
                        $productClass = $productData['category'] === 'tech' ? TechProduct::class : ClothingProduct::class;
                        $product = new $productClass($pdo, ...array_values($productData));
                        $productDetails = $product->getDetails();

                        $productDetails['attributes'] = \app\Model\AttributeSet::getAttributesByProductId($pdo, $productData['id']);

                        return $productDetails;
                    }
                ],
                'products' => [
                    'type' => Type::listOf(ProductSchema::getProductSchema()),
                    'args' => [
                        'category' => Type::string(),
                    ],
                    'resolve' => function($root, $args) use($pdo) {
                        try {
                            if (!empty($args['category'])) {
                                $stmt = $pdo->prepare("SELECT * FROM product WHERE category = :category");
                                $stmt->execute(['category' => $args['category']]);
                            } else {
                                $stmt = $pdo->query("SELECT * FROM product");
                            }
                
                            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                            if (!$products) {
                                throw new \Exception("No products found" . (isset($args['category']) ? " for the category: " . $args['category'] : ""));
                            }
                
                            foreach ($products as &$productData) {
                                $productClass = ($productData['category'] === 'tech') ? TechProduct::class : ClothingProduct::class;
                                $product = new $productClass($pdo, ...array_values($productData));
                                $productData = $product->getDetails();
                            }
                
                            unset($productData);
                
                            return $products;
                        } catch (\Exception $e) {
                            error_log("Error in products query: " . $e->getMessage());
                            return null;
                        }
                    }
                    
                ]
            ]
        ]);
    }
}
