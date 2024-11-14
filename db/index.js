const fs = require("fs");
// 目前 gewechaty 使用sqlite3
const Database = require("better-sqlite3");
const { Room } = require("./Room");
const { Message } = require("./Message");
const { Contact } = require("./Contact");
class DB {
  // 此处实例化只是为了类型提示，实际不会被调用
  table = {
    room: new Room(),
    message: new Message(),
    contact: new Contact(),
  };
  constructor(dbName) {
    this.connect(dbName);
  }
  exists(dbName) {
    return fs.existsSync(dbName);
  }
  // 连接数据库
  async connect(dbName) {
    if (!fs.existsSync(dbName)) {
      console.log(`Database ${dbName} does not exist, creating...`);
    }
    this.db = new Database(dbName);
    console.log(`Connected to database: ${dbName}`);
    await this.bootstrap();
    return this.db;
  }
  async bootstrap() {
    console.log("check inspect");
    this.table.room = new Room(this.db);
    await this.table.room.inspect();
    this.table.message = new Message(this.db);
    await this.table.message.inspect();
    this.table.contact = new Contact(this.db);
    await this.table.contact.inspect();
  }
}
exports.DB = DB;
