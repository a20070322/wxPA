class SyncMessageHandle {
  constructor(core) {
    this.core = core;
  }
  async onRawMessage(raw) {
    try {
      // TODO根据配置是否缓存聊天记录
      const { db } = this.core;
      db.table.message.insertMessage(
        {
          Wxid: raw.Wxid,
          ...raw.Data,
        },
        raw
      );
    } catch (error) {
      console.log(raw);
      console.log(error);
    }
  }
}

module.exports = SyncMessageHandle;
