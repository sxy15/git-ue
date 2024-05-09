import { getConfig } from "../util.js";
import { log } from "../log.js";

export async function current() {
  const { config, current } = await getConfig();

  if(!current) {
    log.error('current alias not set');
    return;
  }

  const { name, email } = config[current] || {};

  if(!name) {
    log.error(`current alias: ${current} not exists`);
    return;
  }

  log.info(`current alias: ${current} | name: ${name} | email: ${email}`);
}