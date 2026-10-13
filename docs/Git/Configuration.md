---
title: Configure Global Git Settings
sidebar_position: 2
---

# Configure Global Git Settings

Git stores user-wide settings in `~/.gitconfig`. The following configuration enables Git LFS, defines the commit identity, configures GPG signing, and applies common macOS-friendly defaults.

## Prerequisites

Install Git LFS before enabling its filter. On macOS with Homebrew:

```bash
brew install git-lfs
git lfs install
```

Back up an existing configuration before changing it:

```bash
cp ~/.gitconfig ~/.gitconfig.backup
```

## Example `.gitconfig`

Edit `~/.gitconfig` and add or update the following sections. Replace the identity, signing key, and GPG path with values from your own system.

```ini
[filter "lfs"]
    clean = git-lfs clean -- %f
    smudge = git-lfs smudge -- %f
    process = git-lfs filter-process
    required = true
[user]
    name = YOUR_NAME
    email = ID+USERNAME@users.noreply.github.com
    signingkey = YOUR_GPG_KEY_ID
[gpg]
    program = /opt/homebrew/bin/gpg
[core]
    editor = vim
    autocrlf = input
    ignorecase = false
[commit]
    gpgsign = true
```

Use `command -v gpg` to find the correct `gpg.program` path. Homebrew on Apple Silicon commonly installs it at `/opt/homebrew/bin/gpg`; Intel Macs commonly use `/usr/local/bin/gpg`.

## Settings Explained

### Git LFS Filter

The `filter.lfs` section lets Git use Git LFS to store large files outside the normal Git object database. `required = true` causes Git to stop instead of silently saving LFS pointer files when Git LFS is unavailable.

Enable LFS tracking for each file pattern needed by a repository:

```bash
git lfs track "*.psd"
git add .gitattributes
git commit -m "chore: track Photoshop files with Git LFS"
```

### Commit Identity and GPG Signing

`user.name` and `user.email` define the author information for commits. Use a verified email address; GitHub's no-reply address keeps a personal address private.

`user.signingkey` selects the GPG key used for signatures, and `commit.gpgsign = true` signs every commit by default. Confirm the key ID before configuring it:

```bash
gpg --list-secret-keys --keyid-format=long
git config --global --get user.signingkey
git config --global --get commit.gpgsign
```

For key creation, platform setup, and verification, see [Sign GitHub and GitLab Commits with GPG](./GPGSigning.md).

### Core Behavior

`core.editor = vim` makes Vim the default editor for commit messages and other Git prompts. `core.autocrlf = input` converts CRLF to LF when committing, while preserving LF files when checking out; it is generally appropriate on macOS and Linux.

`core.ignorecase = false` makes Git detect case-only filename changes. This is useful on the default case-insensitive macOS filesystem, but collaborators on case-insensitive filesystems should avoid keeping two paths that differ only by letter case.

## Verify the Configuration

Inspect the resolved global values after saving the file:

```bash
git config --global --list
git config --global --get-regexp '^(filter\.lfs|user\.|gpg\.|core\.|commit\.)'
```

View the source file of each resolved setting when troubleshooting overrides from repository or system configuration:

```bash
git config --list --show-origin
```
