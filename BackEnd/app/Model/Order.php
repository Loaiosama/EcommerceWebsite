<?php

namespace App\Model;

use PDO;

class Order {
    private $pdo;

    // Constructor to initialize PDO connection
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // Function to create an order in the database
    public function createOrder($productId, $quantity, $customerId) {
        try {
            // SQL query to insert the order into the orders table
            $stmt = $this->pdo->prepare('
                INSERT INTO Orders (product_id, quantity, customer_id, order_date)
                VALUES (:product_id, :quantity, :customer_id, NOW())
            ');

            // Bind the parameters with values
            $stmt->bindParam(':product_id', $productId);
            $stmt->bindParam(':quantity', $quantity);
            $stmt->bindParam(':customer_id', $customerId);

            // Execute the query
            $stmt->execute();

            // Return the ID of the inserted order
            return $this->pdo->lastInsertId();
        } catch (\PDOException $e) {
            // Handle any errors that occur
            throw new \Exception("Error creating order: " . $e->getMessage());
        }
    }
}
