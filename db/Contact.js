const { Base } = require("./Base");

// 联系人表
class Contact extends Base {
  tableName = "contact";
  tableSchema = `
      userName TEXT PRIMARY KEY,
      nickName TEXT,
      pyInitial TEXT,
      quanPin TEXT,
      sex INTEGER,
      remark TEXT,
      remarkPyInitial TEXT,
      remarkQuanPin TEXT,
      signature TEXT,
      alias TEXT,
      snsBgImg TEXT,
      country TEXT,
      bigHeadImgUrl TEXT,
      smallHeadImgUrl TEXT,
      description TEXT,
      cardImgUrl TEXT,
      labelList TEXT,
      province TEXT,
      city TEXT,
      phoneNumList TEXT
    `;
  findOne({ wxid, nickName, remark }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (wxid) sql += ` AND wxid=@wxid`;
    if (nickName) sql += ` AND nickName=@nickName`;
    if (remark) sql += ` AND remark=@remark`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get({ wxid, nickName, remark });
    return row ? row : null;
  }
  findAll({ wxid, nickName, remark }) {
    let sql = `SELECT * FROM ${this.tableName}`;
    if (wxid) sql += ` AND wxid=@wxid`;
    if (nickName) sql += ` AND nickName=@nickName`;
    if (remark) sql += ` AND remark=@remark`;
    const stmt = this.db.prepare(sql);
    const rows = stmt.all({ wxid, nickName, remark });
    return rows || [];
  }
}
exports.Contact = Contact;
