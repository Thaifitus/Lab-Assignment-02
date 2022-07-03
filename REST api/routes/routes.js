// Load the MySQL pool connection
import pool from '../data/config.js';

// Route the app
const router = app => {

    //         GET      //
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });
    // Display all users
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });
    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    //          POST        //
    // Add a new user
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    //      PUT     //
    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;
            response.send('User updated successfully.');
        });
    });

    //      DELETE      //
    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
export default router;