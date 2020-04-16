import typescriptPlugin from 'rollup-plugin-typescript2';
import typescript from 'typescript';
import json from '@rollup/plugin-json';

import packageJSON from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      exports: 'named',
      file: packageJSON.main,
      format: 'cjs',
    },
    {
      file: packageJSON.module,
      format: 'esm',
    },
  ],
  plugins: [typescriptPlugin({ typescript }), json()],
};
