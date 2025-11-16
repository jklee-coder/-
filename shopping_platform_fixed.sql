-- 创建数据库（使用UTF-8字符集）
CREATE DATABASE IF NOT EXISTS shopping_platform 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE shopping_platform;

-- 用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 商品表
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 订单表
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 订单项表
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 购物车表
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY unique_user_product (user_id, product_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 插入示例数据（使用英文描述避免编码问题）
INSERT INTO products (name, description, price, category, image_url, stock) VALUES
('iPhone 15 Pro', 'Latest iPhone with powerful performance', 8999.00, 'Electronics', 'https://via.placeholder.com/300x200/3498db/ffffff?text=iPhone+15+Pro', 50),
('MacBook Air', 'Lightweight and portable laptop', 12999.00, 'Electronics', 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=MacBook+Air', 30),
('AirPods Pro', 'Wireless noise-cancelling headphones', 1999.00, 'Electronics', 'https://via.placeholder.com/300x200/2ecc71/ffffff?text=AirPods+Pro', 100),
('iPad Pro', 'Professional tablet computer', 7999.00, 'Electronics', 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=iPad+Pro', 25),
('Apple Watch', 'Smart watch', 2999.00, 'Electronics', 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Apple+Watch', 80);