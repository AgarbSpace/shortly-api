import { connection } from "../database.js";

async function existingUser(email){
    return connection.query('SELECT * FROM users WHERE email=$1', [email]);
}

async function insertUser(name, email, passwordHashed){
    return connection.query(`
    INSERT INTO 
      users(name, email, password) 
    VALUES ($1, $2, $3)
  `, [name, email, passwordHashed])
}

async function getVisitSum(id){
    return connection.query(`
    SELECT 
       users.*,
      SUM(urls."visitCount") as "visitCount"
    FROM users 
      LEFT JOIN urls ON urls."userId"=users.id
    WHERE users.id=$1
    GROUP BY users.id
  `, [id]);
}

export const usersRepository = {
    existingUser,
    insertUser,
    getVisitSum
}