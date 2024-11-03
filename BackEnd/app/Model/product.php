<?php

namespace app\Model;

use PDO;

abstract class Product {
    protected string $id;
    protected string $name;
    protected bool $inStock;
    protected string $description;
    protected string $category;
    protected string $brand;
    protected float $price;
    protected PDO $pdo;


    public function __construct($pdo, $id, $name, $inStock, $description, $category, $brand) {
        $this->pdo = $pdo;
        $this->id = $id;
        $this->name = $name;
        $this->inStock = (bool)$inStock;
        $this->description = $description;
        $this->category = $category;
        $this->brand = $brand;
    }

    abstract public function getDetails();

    public function getGalleryImages() {
        $stmt = $this->pdo->prepare("SELECT image_url FROM gallery WHERE product_id = :product_id");
        $stmt->execute(['product_id' => $this->id]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function getPrice(){
        $stmt = $this->pdo->prepare("SELECT amount FROM price WHERE product_id = :product_id");
        $stmt->execute(['product_id' => $this->id]);
        return $stmt->fetchColumn();
    }
}

class TechProduct extends Product {
    public function __construct($pdo, $id, $name, $inStock, $description, $category, $brand) {
        parent::__construct($pdo, $id, $name, $inStock, $description, $category, $brand);
    }
    
    public function getDetails() {
        $details = [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'description' => $this->description,
            'category' => $this->category,
            'brand' => $this->brand,
            'gallery' => $this->getGalleryImages(),
            'price' => $this->getPrice(),
        ];
        return $details;
    }
    
}

class ClothingProduct extends Product {
    public function __construct($pdo, $id, $name, $inStock, $description, $category, $brand) {
        parent::__construct($pdo, $id, $name, $inStock, $description, $category, $brand);

    }

    public function getDetails() {
        $details = [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'description' => $this->description,
            'category' => $this->category,
            'brand' => $this->brand,
            'gallery' => $this->getGalleryImages(),
            'price' => $this->getPrice(),
        ];
        return $details;
    }
}
