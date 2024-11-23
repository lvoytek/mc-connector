import fs from "fs";

export const Channels = {
  get(): string[] {
    try {
      const dbData = fs.readFileSync("./channels.json", "utf-8");
      const dbJson = JSON.parse(dbData);

      if ("channels" in dbJson) {
        return dbJson.channels;
      }
    } catch (err) {
      if (!((err as NodeJS.ErrnoException).code === "ENOENT")) {
        console.error(err);
      }
    }
    return [];
  },
  set(data: string[]): void {
    const dbString = JSON.stringify({ channels: data });
    fs.writeFileSync("./channels.json", dbString);
  },
  add(channel: string): void {
    const data = this.get();
    data.push(channel);
    this.set(data);
  },
};
