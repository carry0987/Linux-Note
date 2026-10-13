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
        'Common/CommandList',
        'Common/Sudo',
        'Common/ChangeUsername',
        'Common/ChangeNetworkInterfaceName',
        'Common/DisableCloudInit',
      ],
    },
    {
      type: 'category',
      label: 'System',
      link: { type: 'doc', id: 'System/README' },
      items: [
        'System/AddDiskParted',
        'System/AddDiskFdisk',
        'System/ExpandLVM',
        'System/Swap',
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
        'MacOS/Homebrew',
        'MacOS/Node',
        'MacOS/zshrc',
        'MacOS/TerminalHelpers',
        'MacOS/screenrc',
        'MacOS/tftp',
      ],
    },
    {
      type: 'category',
      label: 'Git',
      link: { type: 'doc', id: 'Git/README' },
      items: [
        'Git/Command',
        'Git/GPGSigning',
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
      items: ['Web/Nginx', 'Web/LetsEncrypt'],
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
        'Docker/command',
        'Docker/portainer',
        'Docker/nginx-proxy-manager',
        'Docker/n8n',
      ],
    },
    {
      type: 'category',
      label: 'K3s',
      link: { type: 'doc', id: 'K3s/Setup' },
      items: [
        'K3s/CommandList',
        'K3s/Helm',
        'K3s/MetalLB',
        'K3s/CertManager',
        'K3s/Longhorn',
        'K3s/ExternalDNS',
        'K3s/Istio',
        'K3s/Secret',
        'K3s/Uninstall',
      ],
    },
    {
      type: 'category',
      label: 'Crontab',
      link: { type: 'doc', id: 'Crontab/README' },
      items: [
        'Crontab/what_is_cron',
        'Crontab/syntax',
        'Crontab/example',
        'Crontab/commands',
        'Crontab/environment',
        'Crontab/restrictions',
        'Crontab/file_location',
        'Crontab/log_file_and_disable_email',
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
