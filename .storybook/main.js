/** @type { import('@storybook/react-webpack5').StorybookConfig } */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config) => {
        config.module.rules = config.module.rules.filter(
            (rule) => !(rule.test && (rule.test.test('.scss') || rule.test.test('.css')))
        );

        config.module.rules.push({
            test: /\.(s[ac]|c)ss$/i,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            includePaths: [
                                path.resolve(__dirname, '../node_modules'),
                                path.resolve(__dirname, '../node_modules/@openedx/brand-openedx/src'),
                            ],
                        },
                    },
                },
            ],
            include: path.resolve(__dirname, '../'),
        });

        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...config.resolve.alias,
            'env.config': path.resolve(__dirname, './env.config.js'),
            '@edx/brand': path.resolve(__dirname, '../node_modules/@openedx/brand-openedx/src'),
            src: path.resolve(__dirname, '../src'),
        };

        return config;
    },
};

export default config;
