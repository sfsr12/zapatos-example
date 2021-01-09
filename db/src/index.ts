/// <reference path="./zapatos/schema.d.ts" />

import * as db from "zapatos/db";
import type * as s from "zapatos/schema";
import pool from "./pg-pool";

export { db, s, pool };
