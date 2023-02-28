import path from 'path';
import fs from 'fs-extra';
import * as execa from 'execa';

const testDir = path.resolve(__dirname, '../e2e/playground/basic');

const defaultExecaOpts = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

const ROOT = path.resolve(__dirname, '..');

const prepareE2E = () => {
  if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
    execa.commandSync('pnpm build', {
      cwd: ROOT,
      ...defaultExecaOpts
    });
  }
  execa.commandSync('npx playwright install', {
    cwd: ROOT,
    ...defaultExecaOpts
  });
  execa.commandSync('pnpm i', {
    cwd: testDir,
    ...defaultExecaOpts
  });
  execa.commandSync('pnpm dev', {
    cwd: testDir,
    ...defaultExecaOpts
  });
};

prepareE2E();
