<?php

namespace app\Model;

use PDO;

class Order {
    private PDO $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function createOrder($productId, $name, $price, $size, $color, $capacity, $quantity) {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO orders (product_id, name, price, size, color, capacity, quantity) VALUES (:product_id, :name, :price, :size, :color, :capacity, :quantity)");

            $stmt->execute([
                ':product_id' => $productId,
                ':name' => $name,
                ':price' => $price,
                ':size' => $size,
                ':color' => $color,
                ':capacity' => $capacity,
                ':quantity' => $quantity,
            ]);


            return $this->pdo->lastInsertId();
        } catch (\PDOException $e) {
            throw new \Exception("Error creating order: " . $e->getMessage());
        }
    }
}
