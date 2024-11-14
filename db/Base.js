class Base {
  constructor(db) {
    if (!db) return;
    this.db = db;
  }
  async createTable() {
    if (this.tableSchema) {
      console.log(`Table ${this.tableName} does not exist, creating...`);
      this.db.exec(`CREATE TABLE ${this.tableName} (${this.tableSchema})`);
    } else {
      throw new Error(`${this.tableName} tableSchema is not defined.`);
    }
  }
  async inspect() {
    console.log(`inspect table => ${this.tableName} `);
    if (!(await this.checkExists())) {
      await this.createTable();
    } else {
      console.log(`Table ${this.tableName} is exists.`);
    }
  }
  checkExists() {
    return this.db
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
      .get(this.tableName);
  }
}
exports.Base = Base;
