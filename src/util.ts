import fse from 'fs-extra'
import { CONFIG_PATH, CURRENT } from './constants.js'

const { readFile, ensureFile, writeFile } = fse;

export async function getConfig(hasCurrent = true) {
  await ensureFile(CONFIG_PATH);

  const configString = await readFile(CONFIG_PATH, 'utf-8');

  const config = configString ? JSON.parse(configString) : {};

  const current = config[CURRENT];

  if(!hasCurrent) {
    delete config[CURRENT]
  }

  return {config, current};
}

export async function setConfig(config: Record<string, any>, current?: string) {
  await ensureFile(CONFIG_PATH);

  if(current) {
    config[CURRENT] = current;
  }

  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function renameKey(config: Record<string, any>, oldKey: string, newKey: string) {
  const _config: Record<string, any> = {};
  for(const alias in config) {
    const isSame = alias === oldKey;
    _config[isSame ? newKey : alias] = config[alias];
  }
  return _config;
}
