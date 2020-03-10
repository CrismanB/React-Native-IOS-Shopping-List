import database from "./";

const db = database;

export async function CreateUserTable() {
  await db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE if not exists USER (ID INTEGER PRIMARY KEY, NAME TEXT NOT NULL )"
    );
  });
}

export async function CreateListTable() {
  await db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE if not exists LIST (ID INTEGER PRIMARY KEY, NAME TEXT NOT NULL, CREATED_AT TEXT NOT NULL)"
    );
  });
}

export async function CreateListItemsTable() {
  await db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE if not exists LISTITEMS (ID INTEGER PRIMARY KEY, PRODUCT TEXT NOT NULL, PRICE REAL, QUANTITY REAL, BRAND TEXT, LIST_ID INTEGER NOT NULL, CREATED_AT TEXT NOT NULL, FOREIGN KEY (LIST_ID) REFERENCES LIST(ID) ON DELETE CASCADE)"
    );
  });
}

export function DropTable(table) {
  db.transaction(tx => {
    tx.executeSql(`DROP TABLE ${table}`);
  });
}
