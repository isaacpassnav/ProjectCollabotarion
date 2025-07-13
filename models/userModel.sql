CREATE Table if NOT EXISTS users(
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(150) NOT NULL,
    role ENUM('user','admin') DEFAULT 'user',
    isVerified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    CHECK (CHAR_LENGTH(name) >= 2),
    CHECK (CHAR_LENGTH(password) >= 6)
);