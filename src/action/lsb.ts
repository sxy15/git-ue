import { getConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";

export async function lsb() {
  const { config } = await getConfig(false);

  const { stdout: remoteStdout } = await execa`git remote -v`;
  const _remote = remoteStdout.split('\n')[1].split('\t')[1].split(' ')[0];

  const aliases = []

  for (const alias in config) {
    const { remote = [] } = config[alias];

    if(remote.includes(_remote)) {
      aliases.push(alias);
    }
  }

  log.table(aliases);
}