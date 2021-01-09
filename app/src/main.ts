/*
This is expected to fail - and exhibts no type saftey on the author
object below.
*/

import { db, pool } from "@example/db";

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
  ${author.name} is ${author.isLiving ? "alive" : "deceased"}
  `);

  // Disconnecting
  await pool.end();
})();
