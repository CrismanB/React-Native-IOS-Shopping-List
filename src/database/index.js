import * as SQLite from "expo-sqlite";

const database_name = "shopping-list";
const database = SQLite.openDatabase(database_name);

database.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () => {
  //console.log("Foreign keys turned on")
});

export default database;
