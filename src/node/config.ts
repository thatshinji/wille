import { resolve } from 'path';
import fs from 'fs-extra';
import { loadConfigFromFile } from 'vite';
import { UserConfig, SiteConfig } from '../shared/types';

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

export const resolveUserConfig = async (
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) => {
  // get file path
  const configPath = getUserConfigPath(root);
  // get config content
  const result = await loadConfigFromFile({ command, mode }, configPath, root);
  if (result) {
    const { config: rawConfig = {} as RawConfig } = result;
    const userConfig = await (typeof rawConfig === 'function'
      ? rawConfig()
      : rawConfig);
    return [configPath, userConfig] as const;
  } else {
    return [configPath, {} as UserConfig] as const;
  }
};

export const defineConfig = (config: UserConfig) => {
  return config;
};

export const resolveSiteData = (userConfig: UserConfig): UserConfig => {
  return {
    title: userConfig.title || 'willejs',
    description: userConfig.description || 'A SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {}
  };
};

export const resolveConfig = async (
  root: string,
  command: 'serve' | 'build',
  mode: 'development' | 'production'
) => {
  const [configPath = '', userConfig] = await resolveUserConfig(
    root,
    command,
    mode
  );
  const siteConfig: SiteConfig = {
    root,
    configPath,
    siteData: resolveSiteData(userConfig as UserConfig)
  };
  return siteConfig;
};
