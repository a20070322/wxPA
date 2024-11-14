const { Base } = require("./Base");
// 群聊表
class Room extends Base {
  tableName = "room";
  tableSchema = `
      chatroomId TEXT PRIMARY KEY,
      nickName TEXT,
      pyInitial TEXT,
      quanPin TEXT,
      sex INTEGER,
      remark TEXT,
      remarkPyInitial TEXT,
      remarkQuanPin TEXT,
      chatRoomNotify INTEGER,
      chatRoomOwner TEXT,
      smallHeadImgUrl TEXT,
      memberList TEXT
    `;
  findOne({ wxid, nickName }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (wxid) sql += ` AND wxid=@wxid`;
    if (nickName) sql += ` AND nickName=@nickName`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get({ wxid, nickName });
    return row ? row : null;
  }
  findAll({ chatroomId, nickName }) {
    let sql = `SELECT * FROM ${this.tableName}`;
    if (chatroomId) sql += ` AND chatroomId=@chatroomId`;
    if (nickName) sql += ` AND nickName=@nickName`;
    const stmt = this.db.prepare(sql);
    const rows = stmt.all({ chatroomId, nickName });
    return rows || [];
  }
}
exports.Room = Room;
