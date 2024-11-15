/**
 * Demo 解析器
 */
class DemoHandle {
  core;
  constructor(core) {
    this.core = core;
  }
  // 消息撤回通知

  /**
   * 监听消息
   * @param {*} msg
   */
  async onMessage(msg) {
    // TODO 通过公众号模板消息推送判断心跳,此处后续抽离
    // 只要有消息接入就是心跳
    if (msg.fromId == "gh_bf214c93111c") {
      console.log("心跳接收成功");
    }

    const { bot } = this.core;
    if (msg.type() === bot.Message.Type.Text) {
      //类型详见 MessageType 表
      console.log("收到文字", msg.text(), msg);
    }
    console.log("MsgType", msg.type());
    if (msg.type() === bot.Message.Type.Image) {
      console.log("收到图片");
      const { url } = await msg.toFileBox();
      const { db } = this.core;
      db.table.message.updateUrl(msg._newMsgId, url);
      console.log("图片地址:", url);
    }
  }

  /**
   * 监听原始消息
   * @param {*} msg
   */
  async onRawMessage(msg) {
    // console.log("eventAll", "原始消息", msg.TypeName);
    // 实现自定义的其他监听扩展
    if (msg.TypeName == "ModContacts") {
      // console.log("eventAll", msg);
    }
  }
  /**
   * 监听被@
   * @param {*} msg
   */
  async onMentionSelf(msg) {
    const room = await msg.room();
    const topic = await room.topic();
    console.log(`被@我\n群名称:${topic}\n内容:${msg.text()}`);
  }

  /**
   * 监听群邀请
   * @param {*} roomInvitation
   */
  async onRoomInvite(roomInvitation) {
    // TODO 增加配置，是否自动接受
    try {
      await roomInvitation.accept();
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * 监听好友申请
   * @param {*} friendship
   */
  async onFriendship(friendship) {
    // TODO 增加配置是否开启，且提示词配置
    const scene = friendship.type(); // 获取场景 3 ：微信号搜索  4 ：QQ好友  8 ：来自群聊  15：手机号
    if (friendship.hello() === "ding" && scene === 15) {
      // 打招呼消息为ding 且是通过手机号添加的好友 则自动通过
      friendship.accept();
    }
  }

  /**
   * 监听群成员加入
   * @param {*} room
   * @param {*} contact
   */
  async onRoomJoin(room, contact) {
    // TODO 以下废弃
    const topic = await room.topic();
    const log = `群聊加入\n群id:${
      room.chatroomId
    }\n群名称:${topic}\n群成员:${contact.name()}`;
    console.log(log);
    room.say(log);
  }
  /**
   * 监听群成员退出
   * @param {*} room
   * @param {*} contact
   */
  async onRoomLeave(room, contact) {
    // TODO 以下废弃
    const topic = await room.topic();
    const log = `群聊退出\n群id:${
      room.chatroomId
    }\n群名称:${topic}\n群成员:${contact.name()}\n群备注:${contact.alias()}`;
    console.log(log);
    room.say(log);
  }

  /**
   * 监听群名称变更
   * @param {*} room
   * @param {*} newTopic
   * @param {*} oldTopic
   */
  async onRoomTopic(room, newTopic, oldTopic) {
    // TODO 以下废弃
    const log = `群聊名称变更\n群id:${room.chatroomId}\n旧群名称:${oldTopic}\n新群名称:${newTopic}`;
    console.log(log);
    room.say(log);
  }
}

module.exports = DemoHandle;
