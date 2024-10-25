<?php

namespace App\Model;

abstract class Product {
    protected $id;
    protected $name;
    protected $inStock;
    protected $description;
    protected $category;
    protected $brand;
    protected $attributes;

    public function __construct($id, $name, $inStock, $description, $category, $brand, $attributes = []) {
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->description = $description;
        $this->category = $category;
        $this->brand = $brand;
        $this->attributes = $attributes;
    }

    abstract public function getDetails();
}

class TechProduct extends Product {
    public function getDetails() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'category' => $this->category,
            'brand' => $this->brand,
            'attributes' => $this->attributes
        ];
    }
}

class ClothingProduct extends Product {
    public function getDetails() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'inStock' => $this->inStock,
            'category' => $this->category,
            'brand' => $this->brand,
            'attributes' => $this->attributes
        ];
    }
}
