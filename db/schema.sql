CREATE TABLE IF NOT EXISTS "authors" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isLiving" BOOLEAN
);