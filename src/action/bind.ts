import { getConfig, setConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";

export async function bind(alias: string) {
  const { config } = await getConfig();

  if(!config[alias]) {
    log.error(`alias: ${alias} not exists`);
    return;
  }

  const { remote = [] } = config[alias];

  const { stdout: nameStdout } = await execa`git remote -v`;
  const _remote = nameStdout.split('\n')[1].split('\t')[1].split(' ')[0];

  if(!remote.includes(_remote)) {
    remote.push(_remote);
  }

  config[alias].remote = remote;

  await setConfig(config);

  log.success(`bind alias: ${alias} success`);
}