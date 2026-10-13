---
title: Add the Key to GitHub and GitLab
---

# Add the Key to GitHub and GitLab

Upload the public key, `~/.ssh/id_ed25519.pub`, to each service that should accept it. The same public key may be used by both GitHub and GitLab.

## Add the Public Key

Copy the key to the clipboard on macOS:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

Add it to both providers:

1. In GitHub, open **Settings**, then **SSH and GPG keys**, and select **New SSH key**.
2. In GitLab, open **Edit profile**, then **Access**, **SSH keys**, and select **Add new key**.

Give the key a recognizable title, such as the computer name, and paste the complete single-line public key.

## Verify Authentication

Run the following commands. On the first connection, compare the presented host fingerprint with the provider's official published SSH host fingerprints before accepting it. The services should then confirm authentication, even though they do not provide shell access.

```bash
ssh -T git@github.com
ssh -T git@gitlab.com
```

GitHub's test normally exits with status `1` after displaying a successful-authentication message because it does not provide shell access. This is expected.

Use SSH remote URLs for new repositories:

```bash
git clone git@github.com:USERNAME/REPOSITORY.git
git clone git@gitlab.com:USERNAME/REPOSITORY.git
```

Convert an existing repository after confirming the target URL:

```bash
git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
git remote -v
```

## Use Separate Keys for Separate Accounts

When two accounts must use different keys, create a host alias in `~/.ssh/config` instead of relying on whichever key `ssh-agent` offers first:

```sshconfig
Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_personal
    IdentitiesOnly yes

Host gitlab-work
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_ed25519_work
    IdentitiesOnly yes
```

Restrict the configuration file, then use the aliases in Git remote URLs:

```bash
chmod 600 ~/.ssh/config
git clone git@github-personal:PERSONAL_USERNAME/REPOSITORY.git
git clone git@gitlab-work:GROUP/REPOSITORY.git
```

For a self-managed GitLab instance, replace `gitlab.com` with its hostname in both `HostName` and the repository URL.
