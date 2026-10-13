---
title: Authenticate GitHub and GitLab with SSH
sidebar_position: 4
---

# Authenticate GitHub and GitLab with SSH

This guide configures an SSH key for Git remotes on both GitHub and GitLab. One `ed25519` key can be added to both accounts. Use a separate key only when an organisation requires it or when the accounts must remain isolated.

## Workflow

1. [Create and Load an SSH Key](./SSH/Setup.md): Generate an `ed25519` key pair, protect it with a passphrase, and load it into `ssh-agent`.
2. [Add the Key to GitHub and GitLab](./SSH/Identities.md): Upload the public key to both providers, configure host aliases when separate accounts need separate keys, and verify authentication.
3. [Retrieve Published Public Keys](./SSH/PublishedKeys.md): Download public SSH or GPG keys from GitHub, GitLab, or a self-managed GitLab instance, then safely install SSH keys on a server.

:::caution

Never share the private key file, such as `~/.ssh/id_ed25519`. Only the `.pub` file is uploaded, downloaded, or added to `~/.ssh/authorized_keys`.

:::
