const { Base } = require("./Base");
// 定时任务表
class Task extends Base {
  tableName = "task";
  tableSchema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    schedule TEXT NOT NULL,
    payload TEXT NOT NULL,
    taskFn TEXT NOT NULL,
    remark TEXT,
    status INTEGER
`;
  findOne({ name, status }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (name) sql += ` AND name=@name`;
    if (status) sql += ` AND status=@status`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get({ name, status });
    return row ? row : null;
  }
  findAll({ name, status }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (name) sql += ` AND name=@name`;
    if (status) sql += ` AND status=@status`;
    const stmt = this.db.prepare(sql);
    const rows = stmt.all({ name, status });
    return rows || [];
  }
}
exports.Task = Task;
