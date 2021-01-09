/*
This is expected to run correct - and exhibt full type saftey.  It is 
here simply to verify everything was setup correctly and is functioning.
*/

import * as db from "zapatos/db";
import pool from "./pg-pool";

(async () => {
  // Clearing existing records from authors table
  await db.sql`TRUNCATE TABLE authors`.run(pool);

  // Adding author to authors table
  await db
    .insert("authors", {
      name: "Gabriel Garcia Marquez",
      isLiving: false,
    })
    .run(pool);

  // Getting author details that we just added
  const author = await db
    .selectExactlyOne("authors", {
      name: "Gabriel Garcia Marquez",
    })
    .run(pool);

  // Logging out results
  console.log(`
  ${author.name} is still ${author.isLiving ? "alive" : "deceased"}
  `);

  // Disconnecting
  await pool.end();
})();
