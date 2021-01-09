import * as pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5444,
  database: "example",
  user: "postgres",
  password: "mysecretpassword",
});
pool.on("error", (err) => console.error(err)); // don't let a pg restart kill your app

export default pool;
