import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
    title: 'Linux-Note',
    tagline: 'To save the note of Linux',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://carry0987.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/Linux-Note/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'carry0987', // Usually your GitHub org/user name.
    projectName: 'Linux-Note', // Usually your repo name.

    // The broken links detection is only available for a production build
    onBrokenLinks: 'throw',

    // Global markdown configuration
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'warn',
            onBrokenMarkdownImages: 'throw',
        },
    },

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            '@docusaurus/preset-classic',
            {
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                },
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    showLastUpdateAuthor: true,
                    showLastUpdateTime: true,
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/carry0987/Linux-Note/tree/master/',
                },
                blog: {
                    showReadingTime: true,
                    blogSidebarTitle: 'All posts',
                    blogSidebarCount: 'ALL',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/carry0987/Linux-Note/tree/master/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        navbar: {
            title: 'Linux-Note',
            logo: {
                alt: 'carry0987 Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Tutorial',
                },
                { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://github.com/carry0987/Linux-Note',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            copyright: `Copyright © ${new Date().getFullYear()} carry0987. Built with Docusaurus.`,
        },
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        prism: {
            theme: prismThemes.oneDark,
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['tsx', 'css', 'json', 'bash', 'ini', 'nginx'],
        },
        liveCodeBlock: {
            /**
             * The position of the live playground, above or under the editor
             * Possible values: "top" | "bottom"
             */
            playgroundPosition: 'bottom',
        },
        algolia: {
            appId: 'QD9ONUTNCR',
            apiKey: 'd77abf82f13a78ecac82795cd03cff1a',
            indexName: 'carry0987io',
            contextualSearch: true,
            externalUrlRegex: 'external\\.com|domain\\.com',
            replaceSearchResultPathname: {
                from: '/docs/', // or as RegExp: /\/docs\//
                to: '/docs/',
            },
            searchParameters: {},
            searchPagePath: 'search',
            insights: false,
        },
    } satisfies Preset.ThemeConfig,
    themes: ['@docusaurus/theme-live-codeblock'],
};

export default config;
