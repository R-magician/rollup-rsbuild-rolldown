import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import nodeGlobals from 'rollup-plugin-node-globals';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const postcssConfig = require('./postcss.config.cjs');

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist-rollup/bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            babelHelpers: 'runtime',
            include: ['src/**/*'],
            exclude: ['node_modules/**'],
            extensions: ['.js', '.ts', '.tsx'],
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
        }),
        typescript(),
        postcss({
            ...postcssConfig,
            extract: 'dist-rollup/styles.css',
        }),
        nodeGlobals(), // 添加 nodeGlobals 插件
        serve({
            open: true,
            contentBase: ['public', 'dist-rollup'],
            port: 3000,
        }),
        livereload({ watch: 'dist-rollup' }),
    ],
};