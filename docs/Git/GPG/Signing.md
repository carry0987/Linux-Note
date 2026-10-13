---
title: Configure and Verify Signed Commits
---

# Configure and Verify Signed Commits

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