import { createConnection } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const db=createConnection({
    host: "localhost",
    user: "root",
    password: process.env.SQL_PASSWORD,
    database: "GymMembershipDB",
})

db.connect((err) => {
    if (err) {
        console.log('Database connection failed: ', err);
        return;
    }
    console.log('Database connected');
});
export default db;