const { Base } = require("./Base");

// 消息表
class Message extends Base {
  tableName = "message";
  tableSchema = `
    newMsgId INTEGER UNIQUE PRIMARY KEY,
    msgId INTEGER,
    wxid TEXT NOT NULL,
    fromUserName TEXT NOT NULL,
    toUserName TEXT NOT NULL,
    msgType INTEGER NOT NULL,
    content TEXT,
    status INTEGER,
    imgStatus INTEGER,
    imgBuf TEXT,
    createTime INTEGER,
    msgSource TEXT,
    pushContent TEXT,
    msgSeq INTEGER,
    jsonData TEXT
  `;
  findOne({ newMsgId }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (newMsgId) sql += ` AND newMsgId=@newMsgId`;
    const stmt = this.db.prepare(sql);
    const row = stmt.get({ newMsgId });
    return row ? row : null;
  }
  findAll({ wxid }) {
    let sql = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    if (newMsgId) sql += ` AND newMsgId=@newMsgId`;
    const stmt = this.db.prepare(sql);
    const rows = stmt.all({ wxid });
    return rows || [];
  }
}
exports.Message = Message;

/**
 * newMsgId: 唯一的消息ID 作为主键
 * messageId: 消息ID
 * wxid: 所属微信的 wxid
 * fromUserName: 消息发送人的 wxid
 * toUserName: 消息接收人的 wxid
 * messageType: 消息类型
 * content: 消息内容，对于文本和 emoji 表情消息，这里是文本内容；对于图片、语音、视频消息，这里是相关的 XML 或 JSON 结构
 * status: 消息状态
 * imgStatus: 图片状态，仅对图片消息有效
 * imgBuf: 图片的 base64 编码，仅对图片消息有效
 * createTime: 消息发送时间
 * msgSource: 消息来源的 XML 结构
 * pushContent: 消息通知内容
 * msgSeq: 消息序列号
 * jsonData: 原始内容SON
 * TODO 以下待定
 * isSelf: 是否自己发送的消息
 * sessionId: 会话ID
 * createDate: 消息创建时间 YYYY-MM-DD
 * isAT: 是否@我
 */
