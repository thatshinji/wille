import { resolve } from 'path';
import * as fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { UserConfig } from '../shared/types';

type RawConfig =
  | UserConfig
  | Promise<UserConfig>
  | (() => UserConfig | Promise<UserConfig>);

export const getUserConfigPath = (root: string) => {
  try {
    const supportConfigFiles = ['config.ts', 'config.js'];
    const configPath = supportConfigFiles
      .map((file) => resolve(root, file))
      .find(fs.pathExistsSync);
    return configPath;
  } catch (e) {
    console.error(`fail to load user file: ${e}`);
    throw e;
  }
};

export const resolveConfig = async (
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) => {
  // get file path
  const configPath = getUserConfigPath(root);
  //get config content
  const result = loadConfigFromFile({ command, mode }, configPath, root);
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result || { config: {} };
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
};
