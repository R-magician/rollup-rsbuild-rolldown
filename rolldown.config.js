import { defineConfig } from 'rolldown'
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import nodeGlobals from 'rollup-plugin-node-globals';
import { rolldown } from '@rolldown/node'
import scss from 'rollup-plugin-scss';

export default defineConfig({
    input: 'src/index.tsx',
    output: {
        file: 'dist-rolldown/bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        rolldown({
            nodeResolve: true,
            commonjs: true,
            input: 'src/index.tsx',
            output: {
                file: 'dist-rolldown/bundle.js',
                format: 'iife',
                sourcemap: true,
            },
        }),
        babel({
            babelHelpers: 'runtime',
            include: ['src/**/*'],
            exclude: ['node_modules/**'],
            extensions: ['.js', '.ts', '.tsx'],
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
        }),
        typescript(),
        scss({
            include: ['src/**/*.scss'],
            exclude: ['node_modules/**/*.scss'],
            output: 'dist-rolldown/styles.css',
            sourceMap: true,
        }),
        nodeGlobals(), // 添加 nodeGlobals 插件
        serve({
            open: true,
            contentBase: ['public', 'dist-rolldown'],
            port: 3000,
        }),
        livereload({ watch: 'dist-rolldown' }),
    ],
});