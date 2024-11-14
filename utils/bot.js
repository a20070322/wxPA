/**
 * 判断是否为群聊
 */
exports.isChatRoom = (id) => {
  return id.endsWith("@chatroom");
};
