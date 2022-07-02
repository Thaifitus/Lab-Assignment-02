import mysql from 'mysql';

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'NguyenThai',
    password: 'HoangThai123',
    database: 'api'
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
export default pool;