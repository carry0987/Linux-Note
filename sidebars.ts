import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
    - create an ordered group of docs
    - render a sidebar for each doc of that group
    - provide next/previous navigation

    The sidebars can be generated from the filesystem, or explicitly defined here.

    Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        'intro',
        {
            type: 'category',
            label: 'Setup',
            link: { type: 'doc', id: 'Setup/README' },
            items: [],
        },
        {
            type: 'category',
            label: 'Common',
            link: { type: 'doc', id: 'Common/README' },
            items: [
                {
                    type: 'category',
                    label: 'Administration',
                    items: ['Common/Administration/CommandList', 'Common/Administration/Sudo'],
                },
                {
                    type: 'category',
                    label: 'Accounts and Networking',
                    items: [
                        'Common/AccountsAndNetworking/ChangeUsername',
                        'Common/AccountsAndNetworking/ChangeNetworkInterfaceName',
                    ],
                },
                {
                    type: 'category',
                    label: 'Cloud Images',
                    items: ['Common/CloudImages/DisableCloudInit'],
                },
            ],
        },
        {
            type: 'category',
            label: 'System',
            link: { type: 'doc', id: 'System/README' },
            items: [
                {
                    type: 'category',
                    label: 'Storage',
                    items: [
                        'System/Storage/AddDiskParted',
                        'System/Storage/AddDiskFdisk',
                        'System/Storage/ExpandLVM',
                    ],
                },
                {
                    type: 'category',
                    label: 'Memory',
                    items: ['System/Memory/Swap'],
                },
            ],
        },
        {
            type: 'category',
            label: 'Server',
            link: { type: 'doc', id: 'Server/README' },
            items: [],
        },
        {
            type: 'category',
            label: 'GCP',
            link: { type: 'doc', id: 'GCP/SSH' },
            items: [],
        },
        {
            type: 'category',
            label: 'MacOS',
            link: { type: 'doc', id: 'MacOS/Config' },
            items: [
                {
                    type: 'category',
                    label: 'Development',
                    items: ['MacOS/Development/Homebrew', 'MacOS/Development/Node'],
                },
                {
                    type: 'category',
                    label: 'Terminal',
                    items: [
                        'MacOS/Terminal/zshrc',
                        'MacOS/Terminal/TerminalHelpers',
                        'MacOS/Terminal/screenrc',
                    ],
                },
                {
                    type: 'category',
                    label: 'Networking',
                    items: ['MacOS/Networking/tftp'],
                },
            ],
        },
        {
            type: 'category',
            label: 'Git',
            link: { type: 'doc', id: 'Git/README' },
            items: [
                'Git/Command',
                {
                    type: 'category',
                    label: 'GPG Signing',
                    items: ['Git/GPGSigning', 'Git/GPG/Setup', 'Git/GPG/Identities', 'Git/GPG/Signing'],
                },
                'Git/OrphanBranch',
            ],
        },
        {
            type: 'category',
            label: 'Python',
            link: { type: 'doc', id: 'Python/Conda' },
            items: ['Python/Jupyter'],
        },
        {
            type: 'category',
            label: 'Vim',
            link: { type: 'doc', id: 'Vim/README' },
            items: [],
        },
        {
            type: 'category',
            label: 'Tools',
            link: { type: 'doc', id: 'Tools/README' },
            items: [],
        },
        {
            type: 'category',
            label: 'Htop',
            link: { type: 'doc', id: 'Htop/README' },
            items: [],
        },
        {
            type: 'category',
            label: 'Web',
            link: { type: 'doc', id: 'Web/UFW' },
            items: [
                {
                    type: 'category',
                    label: 'Web Server',
                    items: ['Web/WebServer/Nginx', 'Web/WebServer/LetsEncrypt'],
                },
            ],
        },
        {
            type: 'category',
            label: 'Proxy',
            link: { type: 'doc', id: 'Proxy/SSR' },
            items: ['Proxy/VPN'],
        },
        {
            type: 'category',
            label: 'Docker',
            link: { type: 'doc', id: 'Docker/setup' },
            items: [
                {
                    type: 'category',
                    label: 'Core',
                    items: ['Docker/Core/command'],
                },
                {
                    type: 'category',
                    label: 'Applications',
                    items: [
                        'Docker/Applications/portainer',
                        'Docker/Applications/nginx-proxy-manager',
                        'Docker/Applications/n8n',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'K3s',
            link: { type: 'doc', id: 'K3s/Setup' },
            items: [
                {
                    type: 'category',
                    label: 'Core',
                    items: ['K3s/Core/CommandList', 'K3s/Core/Helm'],
                },
                {
                    type: 'category',
                    label: 'Networking and Ingress',
                    items: [
                        'K3s/NetworkingAndIngress/MetalLB',
                        'K3s/NetworkingAndIngress/ExternalDNS',
                        'K3s/NetworkingAndIngress/Istio',
                        'K3s/NetworkingAndIngress/CertManager',
                    ],
                },
                {
                    type: 'category',
                    label: 'Storage and Secrets',
                    items: ['K3s/StorageAndSecrets/Longhorn', 'K3s/StorageAndSecrets/Secret'],
                },
                {
                    type: 'category',
                    label: 'Maintenance',
                    items: ['K3s/Maintenance/Uninstall'],
                },
            ],
        },
        {
            type: 'category',
            label: 'Crontab',
            link: { type: 'doc', id: 'Crontab/README' },
            items: [
                {
                    type: 'category',
                    label: 'Getting Started',
                    items: [
                        'Crontab/GettingStarted/what_is_cron',
                        'Crontab/GettingStarted/syntax',
                        'Crontab/GettingStarted/example',
                    ],
                },
                {
                    type: 'category',
                    label: 'Reference',
                    items: [
                        'Crontab/Reference/commands',
                        'Crontab/Reference/environment',
                        'Crontab/Reference/restrictions',
                        'Crontab/Reference/file_location',
                        'Crontab/Reference/log_file_and_disable_email',
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'qBittorrent',
            link: { type: 'doc', id: 'qBittorrent/Setup' },
            items: ['qBittorrent/Uninstall'],
        },
    ],
};

export default sidebars;
