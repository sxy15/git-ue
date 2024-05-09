import { getConfig } from "../util.js";
import { addType } from "../types.js";
import { log } from "../log.js";

export async function ls() {
  const { config } = await getConfig(false);

  let list: Required<addType & {remote: string[]}>[] = []
  for(const alias in config) {
    const { name, email, remote } = config[alias] || {};
    list.push({alias, name, email, remote});
  }

  log.table(list);
}
