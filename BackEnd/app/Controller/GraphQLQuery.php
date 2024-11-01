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
                // Query for single product by ID
                'xc' => [
                    'type' => ProductSchema::getProductSchema(),
                    'args' => [
                        'id' => Type::string(),
                    ],
                    'resolve' => function($root, $args) use($pdo) {
                        $stmt = $pdo->prepare("SELECT * FROM Product WHERE id = :id");
                        $stmt->execute(['id' => $args['id']]);
                        $productData = $stmt->fetch(PDO::FETCH_ASSOC);

                        if (!$productData) {
                            throw new \Exception("Product not found");
                        }

                        // Determine Product type
                        $productClass = ($productData['category'] === 'tech') ? TechProduct::class : ClothingProduct::class;
                        $product = new $productClass($pdo, ...array_values($productData));
                        return $product->getDetails();
                    }
                ],
                // Query for products by category
                'products' => [
                    'type' => Type::listOf(ProductSchema::getProductSchema()),
                    'args' => [
                        'category' => Type::string(),
                    ],
                    'resolve' => function($root, $args) use($pdo) {
                        try {
                            // echo "From resolve"; 
                            // var_dump($pdo);
                            // var_dump($args);
                            if (!isset($args['category'])) {
                                var_dump($args['category']); 
                            }
                            $stmt = $pdo->prepare("SELECT * FROM product WHERE category = :category ");
                            $stmt->execute(['category' => $args['category']]);
                            
                            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

                            // var_dump($products); 
                    
                            if (!$products) {
                                throw new \Exception("No products found for the category: " . $args['category']);
                            }
                    
                            foreach ($products as &$productData) {
                                $productClass = ($productData['category'] === 'tech') ? TechProduct::class : ClothingProduct::class;
                                // echo "Selected class for product: " . $productClass . "\n";
                                // var_dump($pdo, $productData); 
                                $product = new $productClass($pdo, ...array_values($productData));
                                // $product = new TechProduct($pdo, $productData['id'], $productData['name'], $productData['in_stock'], $productData['description'], $productData['category'], $productData['brand']);
                                echo "After class";
                                // var_dump($product);
                                // Replace the original productData with the complete details
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
