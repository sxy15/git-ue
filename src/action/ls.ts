import { getConfig } from "../util.js";
import { addType } from "../types.js";
import { log } from "../log.js";

export async function ls() {
  const { config } = await getConfig(false);

  let list: Required<addType>[] = []
  for(const alias in config) {
    const { name, email } = config[alias] || {};
    list.push({alias, name, email});
  }
  log.table(list);
}
