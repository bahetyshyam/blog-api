const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT
}
)

const postBlogs = (request,response) => {
    const title = request.body.title;
    const content = request.body.content;
    const userid = 1;

    pool.query("INSERT INTO blogs (title,content,userid) values ($1, $2, $3)", [title, content, userid], (error, results) => {
        if(error) {
            throw error
        }
        response.status(201).send("Blog added to the table");
    })
}

const getBlogs = (request,response) => {
    pool.query("Select * from blogs", (err,result) => {
        if(err) {
            throw err
        }
        console.log(result);
        response.status(200).json(result.rows);
    })
}

module.exports = {
    postBlogs,
    getBlogs
}