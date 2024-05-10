import { getConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";

export async function check() {
  const { config, current } = await getConfig();

  if(!current || !config[current]) {
    return;
  }

  const { remote = [] } = config[current];
  const aliases = [];

  const { stdout: remoteStdout } = await execa`git remote -v`;
  const _remote = remoteStdout.split('\n')[1].split('\t')[1].split(' ')[0];

  for(const alias in config) {
    const { remote = [] } = config[alias];

    if(remote.includes(_remote)) {
      aliases.push(alias);
    }
  }

  if(!remote.includes(_remote)) {
    log.error(`current alias: ${current}`);
    log.info('your bind: ');
    log.table(aliases);
    process.exit(1);
  }
}
