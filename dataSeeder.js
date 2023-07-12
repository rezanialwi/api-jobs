const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
    host:        'localhost',
    user:        'root',
    password:    '',
    database:    'db_portal_job'
});

// Sample user data
const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
];

// Insert sample user data into the database
const insertUsers = () => {
  const sql = 'INSERT INTO users (username, password) VALUES ?';
  const values = users.map((user) => [user.username, user.password]);

  connection.query(sql, [values], (error) => {
    if (error) {
      console.error(error);
      connection.end();
      return;
    }

    console.log('Sample users inserted successfully');
    connection.end();
  });
};

// Connect to MySQL and insert the sample data
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }

  console.log('Connected to MySQL');
  insertUsers();
});
