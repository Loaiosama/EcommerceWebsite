<?php

namespace app\Model;

use PDO;

class Order {
    private PDO $pdo;

    // Constructor to initialize PDO connection
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Function to create an order in the database
    public function createOrder($productId, $name, $price, $size, $color, $capacity, $quantity) {
        try {
            // SQL query to insert the order into the orders table
            
            
            $stmt = $this->pdo->prepare("INSERT INTO orders (product_id, name, price, size, color, capacity, quantity) VALUES (:product_id, :name, :price, :size, :color, :capacity, :quantity)");

            // Bind the parameters with values
            $stmt->execute([
                ':product_id' => $productId,
                ':name' => $name,
                ':price' => $price,
                ':size' => $size,
                ':color' => $color,
                ':capacity' => $capacity,
                ':quantity' => $quantity,
            ]);


            // Return the ID of the inserted order
            return $this->pdo->lastInsertId();
        } catch (\PDOException $e) {
            // Handle any errors that occur
            throw new \Exception("Error creating order: " . $e->getMessage());
        }
    }
}
