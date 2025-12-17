CREATE DATABASE dogclub;

\c dogclub;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE breeds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    group_name VARCHAR(50),
    care_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    version VARCHAR(50),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT REFERENCES users(id),
    file_url TEXT,
    notes TEXT
);

CREATE TABLE model_usage_logs (
    id SERIAL PRIMARY KEY,
    model_id INT REFERENCES models(id),
    user_id INT REFERENCES users(id),
    breed_id INT REFERENCES breeds(id),
    confidence FLOAT,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50)
);
