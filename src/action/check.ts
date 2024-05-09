import { getConfig } from "../util.js";
import { log } from "../log.js";
import { execa } from "execa";

export async function check() {
  const { config, current } = await getConfig();

  if(!current || !config[current]) {
    return;
  }

  const { name, email } = config[current];

  const { stdout: nameStdout } = await execa`git config --get user.name`;
  const { stdout: emailStdout } = await execa`git config --get user.email`;

  if(name !== nameStdout || email !== emailStdout) {
    log.info(`expect: name: ${name} | email: ${email}`);
    log.info(`actual: name: ${nameStdout} | email: ${emailStdout}`);
    log.error('git config not match 【gum current alias】');
    process.exit(1);
    return;
  }
}