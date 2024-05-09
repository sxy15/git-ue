import os from 'node:os';
import path from 'node:path';
export const CURRENT = 'GUM_CURRENT_ALIAS';
export const CONFIG_PATH = path.resolve(os.homedir(), './.gumconfig');
