### API JOBS EXPRESS JS

## Configuration
    * import mysql database resides in the database table
    * npm install
    * npm start
    * php artisan migrate:fresh --seed
    * php artisan serve

## You can test the API using a tool like Postman or cURL. Here are the API endpoints you can try:
    * composer install
    * php artisan migrate
    * php artisan jwt:secret
#### Login API
    * URL: http://localhost:4000/login
    * Method: POST
    * Body: { "username": "user1", "password": "pass1" }

#### Get job list API
    *  URL: http://localhost:4000/jobs
    *  Method: GET
    *  Headers: Authorization: Bearer <JWT Token>
    *  Query Parameters: description, location, full_time, page

#### Get job detail API
    *  URL: http://localhost:4000/jobs/:id
    *  Method: GET
    *  Headers: Authorization: Bearer <JWT Token>
    *  URL Parameter: id




