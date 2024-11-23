export enum MessageType {
  JOIN = "✅",
  QUIT = "🚪",
  SERVER_INFO = "ℹ️",
  DEATH = "💀",
  OTHER = "🤷",
  NONE = "🕴️",
}

export type MinecraftMessage = {
  messageType: MessageType;
  timestamp: string;
  threadInfo: string;
  contents: string;
};

export const MessageResolver = {
  extract(rawMessage: string): MinecraftMessage {
    const re = /^\[(\d{2}:\d{2}:\d{2})\] \[(.+?)\]: (.+)$/;
    const match = rawMessage.match(re);

    if (match) {
      const [, timestamp, threadInfo, contents] = match;
      return {
        messageType: this.getType(contents),
        timestamp,
        threadInfo,
        contents,
      };
    }

    return {
      messageType: MessageType.NONE,
      timestamp: "00:00:00",
      threadInfo: "",
      contents: "",
    };
  },
  getType(messageContent: string): MessageType {
    if (messageContent.match(/joined the game/)) {
      return MessageType.JOIN;
    }

    if (messageContent.match(/left the game/)) {
      return MessageType.QUIT;
    }

    const deathRE =
      /(was (?:killed|slain|shot|obliterated|fireballed|impaled|blown up|stung|poked to death|pricked to death|squashed|squished|frozen to death|struck|skewered)|went off with a bang|didn't want to live|withered away|suffocated|starved|walked into|tried to swim|hit the ground too hard|experienced kinetic energy|drowned|fell|froze|burned to death|went up in flames|discovered the floor was lava|blew up)/;
    if (messageContent.match(deathRE)) {
      return MessageType.DEATH;
    }

    return MessageType.OTHER;
  },
};