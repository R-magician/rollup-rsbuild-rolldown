import { defineConfig } from '@rsbuild/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginBabel } from '@rsbuild/plugin-babel';

export default defineConfig({
    html: {
        template: './index.html',
    },
    output: {
        //生产项目先build-rsbuild，在preview-rsbuild
        distPath: {
            root: './dist-rsbuild', // 修改输出目录为根目录下的 build 文件夹
            js: 'static/js',      // JS 文件输出到 build/static/js
            css: 'static/css',    // CSS 文件输出到 build/static/css
            svg: 'static/svg',    // SVG 文件输出到 build/static/svg
            font: 'static/font',  // 字体文件输出到 build/static/font
            image: 'static/image',// 图片文件输出到 build/static/image
        },
        // 其他输出配置（如文件名哈希）
        filenameHash: true, // 启用文件名哈希（默认开启）
    },
    source: {
        entry: {
            index: './src/index.tsx',
        },
    },
    plugins: [
        pluginReact(),
        pluginBabel(),
        pluginSass({
            sassLoaderOptions: {
                sourceMap: true,
                // 可以加上一些额外的配置，如autoprefixer
            },
        }),
    ],
});
