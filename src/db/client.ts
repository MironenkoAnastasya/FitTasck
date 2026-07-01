import { drizzle } from "drizzle-orm/singlestore/driver"
import { openDatabaseSync } from "expo-sqlite"
import * as schema from "./schema"

const sqlite = openDatabaseSync("fittasck.db");
export const  db = drizzle(sqlite, {schema});