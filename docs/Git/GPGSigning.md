---
title: Sign GitHub and GitLab Commits with GPG
sidebar_position: 3
---

# Sign GitHub and GitLab Commits with GPG

This guide configures one GPG key for signed commits on both GitHub and GitLab. It uses a GitHub no-reply address as the default global identity, then overrides the email address in each GitLab repository.

The same GPG key can contain multiple user IDs (UIDs), so a separate key is not required for each platform.

## Prepare Git and GnuPG

Install Git and GnuPG before configuring a signing key.

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

### Configure the Global `.gitconfig`

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
[filter "lfs"]
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
	required = true
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

Do not set `user.signingkey` or `commit.gpgsign` yet; the guide configures them after a `KEY_ID` is available.

## Prerequisites

- Verify the GitHub no-reply email address in your GitHub account.
- Verify the email address used by GitLab in your GitLab account.

Before creating or configuring a key, list the available secret keys:

```bash
gpg --list-secret-keys --keyid-format=long
```

Use the long key ID shown after `sec` as `KEY_ID` in the following commands.

## Create a GPG Key

Skip this section when an existing signing key is available.

```bash
gpg --full-generate-key
```

Choose the defaults unless your organisation requires a specific algorithm or expiration policy. Enter an email address that has already been verified on either GitHub or GitLab, then choose a strong passphrase.

List the secret keys again and copy the long key ID:

```bash
gpg --list-secret-keys --keyid-format=long
```

## Add Both Email Addresses to the Key

The signing key must have a UID for each commit email address that the hosting platform should verify. Replace `KEY_ID` with the key ID from the previous step:

```bash
gpg --edit-key KEY_ID
```

At the `gpg>` prompt, add the GitLab email address when it is not already listed:

```text
gpg> adduid
Real name: YOUR_NAME
Email address: you@example.com
Comment:
```

GnuPG then displays the proposed UID and asks for confirmation:

```text
You selected this USER-ID:
  "YOUR_NAME <you@example.com>"

Change (N)ame, (C)omment, (E)mail, or (O)kay/(Q)uit? O
```

Replace `YOUR_NAME` and `you@example.com` with the name and email address verified by GitLab. Leave `Comment` empty unless it is required by your organisation. Enter `O` to accept the new UID. GnuPG may then prompt for the key passphrase.

List the key before saving to confirm that the new UID appears, then write the change and leave the editor:

```text
gpg> list
gpg> save
```

Repeat `adduid` for every missing commit email address that should be verified. Do not add an email address that has not been verified on the corresponding GitHub or GitLab account.

:::note

After `adduid`, the new UID can appear as `[ unknown]` even when the key itself is ultimately trusted. This is a local UID-validity display; it does not prevent signing commits or GitHub/GitLab from marking a valid signature as Verified.

:::

### Optional: Set Owner Trust for Your Own Key

Use this step only for a key whose private key you control. Owner trust applies to the entire key, not to one individual UID. A key created on the current computer is usually already ultimately trusted. This step is most useful after importing your private key onto a new computer, because owner trust is stored locally in the GnuPG trust database and is not included when the key is exported or imported.

```bash
gpg --edit-key KEY_ID
```

At the `gpg>` prompt, set the owner trust to ultimate, confirm it, then save and exit:

```text
gpg> trust
Please decide how far you trust this user to correctly verify other users' keys.

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5
Do you really want to set this key to ultimate trust? (y/N) y
gpg> save
```

Setting owner trust to `5` tells the local GnuPG installation that this is your own key and that you trust it to certify identities. After importing your own private key on another computer, this can restore local owner trust. If the key already reports `trust: ultimate`, running `trust` again does not add a new capability and may not change an `[ unknown]` display for a newly added UID.

:::caution

Never set owner trust to ultimate for a key controlled by someone else. This grants that key maximum authority in your local Web of Trust. This setting remains local and does not affect GitHub or GitLab verification.

:::

Confirm that both email addresses appear on the key:

```bash
gpg --list-keys KEY_ID
```

## Upload the Public Key

Export the current public key in ASCII-armored format:

```bash
gpg --armor --export-options export-minimal --export KEY_ID
```

Copy the complete output, including the `BEGIN PGP PUBLIC KEY BLOCK` and `END PGP PUBLIC KEY BLOCK` lines.

Add this public key to both platforms:

1. In GitHub, open **Settings**, then **SSH and GPG keys**, and add a new GPG key.
2. In GitLab, open **Preferences**, then **GPG Keys**, and add the same public key.

Whenever a UID is added or removed, export and upload the updated public key again.

## Configure GitHub as the Default Identity

After a `KEY_ID` is available, configure Git to sign commits and tags by default:

```bash
git config --global user.signingkey KEY_ID
git config --global commit.gpgsign true
git config --global tag.gpgSign true
```

:::caution

Do not set `gpg.format openpgp` unless you intend to switch from SSH or X.509 signing. That setting changes the signing format for every repository using the global configuration.

:::

## Configure a GitLab Repository

Inside each GitLab repository, override only the commit identity with the email address verified by GitLab:

```bash
cd /path/to/gitlab-project
git config --local user.name "YOUR_GITLAB_NAME"
git config --local user.email "you@example.com"
```

The global `user.signingkey` and `commit.gpgsign` settings continue to apply. Because the same key contains both email UIDs, no additional signing-key configuration is required.

Check which values apply to the current repository and where they are defined:

```bash
git config --show-origin --get-regexp '^(user|commit|tag|gpg)\.'
```

## Test the Signature

Create an empty signed commit in the repository you want to test:

```bash
git commit --allow-empty -S -m "chore: test signed commit"
git log --show-signature -n 1
```

The log should report a good signature. Push the commit, then confirm that the commit is marked **Verified** in GitHub or GitLab.

## Troubleshooting

### The Commit Is Not Verified on the Website

Check all of the following:

- The commit email, shown by `git log -1 --format='%ae'`, is verified on the relevant platform.
- The GPG key includes that email as a UID.
- The current public key has been uploaded to the relevant platform after any UID changes.
- The signature is valid locally:

  ```bash
  git log --show-signature -n 1
  ```

### GPG Cannot Prompt for a Passphrase

In a terminal session, set `GPG_TTY` before committing:

```bash
export GPG_TTY=$(tty)
```

Add the same line to the startup file for the shell you use, such as `~/.zshrc` or `~/.bashrc`, to make it persistent.
