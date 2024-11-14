const { debounce } = require("../utils");

// 监听事件
class ProcessEvents {
  core = null;
  constructor(core) {
    console.log("ProcessEvents init start...");
    this.core = core;
    this.initListenEvent();
  }
  initListenEvent() {
    const { bot } = this.core;
    bot.on("room-invite", this.eventRoomInvite.bind(this));
    bot.on("friendship", this.eventFriendship.bind(this));
    bot.on("message", this.eventMessage.bind(this));
    bot.on("all", this.eventAll.bind(this));
    this.startRoomListen();
  }
  async startRoomListen() {
    const { bot } = this.core;
    // TODO 根据配置，后续查询方法自己实现，且转room类

    // const rooms = await bot.Room.findAll();
    const rooms = [await bot.Room.find("51555423480@chatroom")];
    /* The line `const rooms = await bot.Room.findAll();` is calling a method `findAll()` on the
    `bot.Room` object to retrieve a list of all available rooms. This method likely queries a
    database or an external service to fetch the list of rooms that the bot has access to. The
    result is then stored in the `rooms` variable for further processing, such as iterating over
    each room to perform specific actions like adding event listeners or handling room-related
    functionalities. */
    // 因框架限制 部分未保存群需要手动 同步才可选择，后续业务处理
    //  const info = await GetRoomInfo({
    //   appId: getAppId(),
    //   chatroomId: batch[0]
    // });
    // if (info) {
    //   db.insertRoom(info);
    // }
    rooms.forEach(async (room) => {
      // 以下事件 短时间会请求两次，延时三秒执行
      room.on("join", this.eventRoomJoin.bind(this));
      room.on("leave", this.eventRoomLeave.bind(this));
      room.on("topic", this.eventRoomTopic.bind(this));
    });
  }
  /**
   * 群邀请
   */
  async eventRoomInvite(roomInvitation) {
    // TODO 增加配置，是否自动接受
    try {
      await roomInvitation.accept();
    } catch (e) {
      console.error(e);
    }
  }
  /**
   * 好友申请
   */
  async eventFriendship(friendship) {
    // TODO 增加配置是否开启，且提示词配置
    const scene = friendship.type(); // 获取场景 3 ：微信号搜索  4 ：QQ好友  8 ：来自群聊  15：手机号
    if (friendship.hello() === "ding" && scene === 15) {
      // 打招呼消息为ding 且是通过手机号添加的好友 则自动通过
      friendship.accept();
    }
  }
  async eventMentionSelf(msg) {
    const room = await msg.room();
    const topic = await room.topic();
    console.log(`被@我\n群名称:${topic}\n内容:${msg.text()}`);
  }
  // ===== 以下是群消息监听 =====
  async eventRoomJoin(room, contact) {
    const topic = await room.topic();
    const log = `群聊加入\n群id:${
      room.chatroomId
    }\n群名称:${topic}\n群成员:${contact.name()}`;
    console.log(log);
    room.say(log);
  }
  async eventRoomLeave(room, contact) {
    const topic = await room.topic();
    const log = `群聊退出\n群id:${
      room.chatroomId
    }\n群名称:${topic}\n群成员:${contact.name()}\n群备注:${contact.alias()}`;
    console.log(log);
    room.say(log);
  }
  async eventRoomTopic(room, newTopic, oldTopic) {
    const log = `群聊名称变更\n群id:${room.chatroomId}\n旧群名称:${oldTopic}\n新群名称:${newTopic}`;
    console.log(log);
    room.say(log);
  }

  /**
   * 消息监听
   * @param {*} msg
   */
  async eventMessage(msg) {
    const { bot } = this.core;
    const mentionSelf = await msg.mentionSelf();
    console.log("mentionSelf", mentionSelf);
    if (mentionSelf) {
      this.eventMentionSelf(msg);
    }
    if (msg.type() === bot.Message.Type.Text) {
      //类型详见 MessageType 表
      console.log("收到文字", msg.text(), msg);
    }
    if (msg.type() === bot.Message.Type.Image) {
      console.log("收到图片");
    }
  }
  eventAll(msg) {
    // 实现自定义的其他监听扩展
    if ((msg.TypeName = "ModContacts")) {
      // console.log("eventAll", msg);
    }
  }
}

exports.ProcessEvents = ProcessEvents;
