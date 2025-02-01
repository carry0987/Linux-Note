import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

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
            additionalLanguages: ['tsx', 'css', 'json', 'bash'],
        },
        liveCodeBlock: {
            /**
             * The position of the live playground, above or under the editor
             * Possible values: "top" | "bottom"
             */
            playgroundPosition: 'bottom',
        },
        // Optional: Algolia search integration, if you don't need it, you can remove this section
        // algolia: {
        //     // The application ID provided by Algolia
        //     appId: 'TLWF61FQC2',
        //     // Public API key: it is safe to commit it
        //     apiKey: '6ec45419a7334dddfbff735d9c6ccf54',
        //     indexName: 'carry0987io',
        //     // Optional: see doc section below
        //     contextualSearch: true,
        //     // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        //     externalUrlRegex: 'external\\.com|domain\\.com',
        //     // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        //     replaceSearchResultPathname: {
        //         from: '/docs/', // or as RegExp: /\/docs\//
        //         to: '/docs/',
        //     },
        //     // Optional: Algolia search parameters
        //     searchParameters: {},
        //     // Optional: path for search page that enabled by default (`false` to disable it)
        //     searchPagePath: 'search',
        //     // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        //     insights: false,
        // },
    } satisfies Preset.ThemeConfig,
    themes: ['@docusaurus/theme-live-codeblock'],
};

export default config;
