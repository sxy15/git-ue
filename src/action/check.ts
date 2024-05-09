import { getConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";

export async function check() {
  const { config, current } = await getConfig();

  if(!current || !config[current]) {
    return;
  }

  const { remote = [] } = config[current];

  const { stdout: remoteStdout } = await execa`git remote -v`;
  const _remote = remoteStdout.split('\n')[1].split('\t')[1].split(' ')[0];

  if(!remote.includes(_remote)) {
    log.error(`not bind -> alias: ${current} | remote: ${_remote}`);
    process.exit(1);
  }
}
