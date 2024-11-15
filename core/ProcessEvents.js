const handleList = require("../handle");

// 监听事件
class ProcessEvents {
  core = null;
  handleList = [];
  constructor(core) {
    console.log("ProcessEvents init start...");
    this.core = core;
  }
  async initListenEvent() {
    const { bot } = this.core;
    this.handleList = handleList.map((item) => new item(this.core));
    bot.on("room-invite", this.eventRoomInvite.bind(this));
    bot.on("friendship", this.eventFriendship.bind(this));
    bot.on("message", this.eventMessage.bind(this));
    bot.on("all", this.eventAll.bind(this));
    await this.startRoomListen();
  }
  async startRoomListen() {
    const { bot } = this.core;
    // TODO 根据配置，后续查询方法自己实现，且转room类
    // const rooms = await bot.Room.findAll();
    // const rooms = [await bot.Room.find("51555423480@chatroom")];
    // rooms.forEach(async (room) => {
    //   room.on("join", this.eventRoomJoin.bind(this));
    //   room.on("leave", this.eventRoomLeave.bind(this));
    //   room.on("topic", this.eventRoomTopic.bind(this));
    // });
  }
  /**
   * 群邀请
   */
  async eventRoomInvite(roomInvitation) {
    this.handleList.forEach(
      (item) =>
        typeof item?.onRoomInvite === "function" &&
        item?.onRoomInvite(room, contact)
    );
  }
  /**
   * 好友申请
   */
  async eventFriendship(friendship) {
    this.handleList.forEach(
      (item) =>
        typeof item?.onFriendship === "function" &&
        item?.onFriendship(room, contact)
    );
  }
  async eventMentionSelf(msg) {
    // [监听] 自己被@
    this.handleList.forEach(
      (item) =>
        typeof item?.onMentionSelf === "function" && item?.onMentionSelf(msg)
    );
  }
  // ===== 以下是群消息监听 =====
  async eventRoomJoin(room, contact) {
    // [监听]群成员进入
    this.handleList.forEach(
      (item) =>
        typeof item?.onRoomJoin === "function" &&
        item?.onRoomJoin(room, contact)
    );
  }
  async eventRoomLeave(room, contact) {
    // [监听]群成员退出
    this.handleList.forEach(
      (item) =>
        typeof item?.onRoomLeave === "function" &&
        item?.onRoomLeave(room, contact)
    );
  }
  async eventRoomTopic(room, newTopic, oldTopic) {
    // [监听]群名称变更 Message
    this.handleList.forEach(
      (item) =>
        typeof item?.onRoomTopic === "function" &&
        item?.onRoomTopic(room, newTopic, oldTopic)
    );
  }

  /**
   * 消息监听
   * @param {*} msg
   */
  async eventMessage(msg) {
    const mentionSelf = await msg.mentionSelf();
    if (mentionSelf) {
      this.eventMentionSelf(msg);
    }
    // [监听]消息 Message
    this.handleList.forEach(
      (item) => typeof item?.onMessage === "function" && item?.onMessage(msg)
    );
  }
  eventAll(msg) {
    // [监听]原始消息
    this.handleList.forEach(
      (item) =>
        typeof item?.onRawMessage === "function" && item?.onRawMessage(msg)
    );
  }
}

exports.ProcessEvents = ProcessEvents;
