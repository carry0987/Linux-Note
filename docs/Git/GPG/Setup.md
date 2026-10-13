---
title: Prepare Git and GnuPG
---

# Prepare Git and GnuPG

Install Git and GnuPG before configuring commit signing.

## Install the Required Tools

On macOS with Homebrew:

```bash
brew install git gnupg
```

On Ubuntu or Debian:

```bash
sudo apt update
sudo apt install git gnupg
```

Confirm that both commands are available and record the GnuPG executable path:

```bash
git --version
gpg --version
command -v gpg
```

## Configure the Global `.gitconfig`

Use `git config --global` instead of editing `~/.gitconfig` directly. These commands create or update the appropriate sections in that file.

Replace the example identity with the exact no-reply email address displayed in your GitHub email settings:

```bash
git config --global user.name "YOUR_GITHUB_NAME"
git config --global user.email "ID+USERNAME@users.noreply.github.com"
git config --global gpg.program "$(command -v gpg)"
git config --global core.editor vim
git config --global core.autocrlf input
```

The resulting `~/.gitconfig` contains entries similar to the following. The actual path of `gpg` can differ, especially between Intel and Apple Silicon Macs.

```ini
[user]
    name = YOUR_GITHUB_NAME
    email = ID+USERNAME@users.noreply.github.com
[gpg]
    program = /path/to/gpg
[core]
    editor = vim
    autocrlf = input
```

### Optional: Detect Case-only Filename Changes

On a case-insensitive filesystem such as the default macOS filesystem, use this setting when Git must detect filenames that differ only by letter case:

```bash
git config --global core.ignorecase false
```

## Create or Select a GPG Key

Verify the GitHub no-reply email address in your GitHub account and the email address used by GitLab in your GitLab account.

List the available secret keys:

```bash
gpg --list-secret-keys --keyid-format=long
```

Use the long key ID shown after `sec` as `KEY_ID` in the following commands. Skip key generation when an existing signing key is available.

```bash
gpg --full-generate-key
```

Choose the defaults unless your organisation requires a specific algorithm or expiration policy. Enter an email address already verified on either GitHub or GitLab, then choose a strong passphrase.

List the secret keys again and copy the long key ID:

```bash
gpg --list-secret-keys --keyid-format=long
```
