const { Base } = require("./Base");
// 定时任务表
class Config extends Base {
  tableName = "config";
  tableSchema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    payload TEXT NOT NULL,
    remark TEXT
`;
  findOne({ name }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (name) sql += ` AND name=@name`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get({ name });
    return row ? row : null;
  }
  findAll({ name }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (name) sql += ` AND name=@name`;
    const stmt = this.db.prepare(sql);
    const rows = stmt.all({ name });
    return rows || [];
  }
}
exports.Config = Config;
