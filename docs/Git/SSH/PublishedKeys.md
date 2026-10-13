---
title: Retrieve Published Public Keys
---

# Retrieve Published Public Keys

GitHub and GitLab publish a user's public keys over HTTPS. These endpoints expose only public material: SSH keys from `.keys` and OpenPGP keys from `.gpg`.

## Public Key Endpoints

Replace `USERNAME` with the account username:

| Provider | SSH public keys | GPG public keys |
| --- | --- | --- |
| GitHub | `https://github.com/USERNAME.keys` | `https://github.com/USERNAME.gpg` |
| GitLab.com | `https://gitlab.com/USERNAME.keys` | `https://gitlab.com/USERNAME.gpg` |

Self-managed GitLab supports the same URL pattern. Replace `gitlab.example.com` with the instance hostname:

```text
https://gitlab.example.com/USERNAME.keys
https://gitlab.example.com/USERNAME.gpg
```

For example, download and inspect a user's SSH keys before trusting them:

```bash
curl --fail --location --show-error --silent \
  https://github.com/USERNAME.keys > /tmp/USERNAME.github.keys
cat /tmp/USERNAME.github.keys
ssh-keygen -lf /tmp/USERNAME.github.keys
```

Use the GitLab or self-managed GitLab URL in the same command when appropriate. Compare the displayed fingerprints with a fingerprint obtained through a trusted channel before granting access.

:::caution

The HTTPS URL identifies the account that published the key; it does not independently prove that the account belongs to the person you expect. Confirm the fingerprint out of band before authorizing server access.

:::

## Add Downloaded SSH Keys to `authorized_keys`

On the target server, download to a temporary file, inspect it, and append it only after verifying its fingerprint. Do not pipe `curl` directly into `authorized_keys`.

```bash
install -d -m 700 ~/.ssh
temporary_key_file=$(mktemp)
curl --fail --location --show-error --silent \
  https://gitlab.com/USERNAME.keys > "$temporary_key_file"
cat "$temporary_key_file"
ssh-keygen -lf "$temporary_key_file"
```

After confirming the fingerprint, append the verified public key or keys and protect the authorization file:

```bash
cat "$temporary_key_file" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
rm "$temporary_key_file"
```

To use GitHub instead, replace the download URL with `https://github.com/USERNAME.keys`. To use self-managed GitLab, replace it with `https://gitlab.example.com/USERNAME.keys`.

Before appending, check whether a key is already present to avoid duplicates. For a one-key response, compare its public-key blob with the existing file:

```bash
grep -F "$(cut -d ' ' -f2 "$temporary_key_file")" ~/.ssh/authorized_keys
```

If `grep` prints a matching line, do not append it again. For multiple downloaded keys, review each line and its fingerprint separately.

## Import a Published GPG Key

Published GPG keys are not SSH login keys and must never be placed in `~/.ssh/authorized_keys`. Download and inspect them before importing:

```bash
curl --fail --location --show-error --silent \
  https://github.com/USERNAME.gpg > /tmp/USERNAME.github.gpg
gpg --show-keys --fingerprint /tmp/USERNAME.github.gpg
```

Import only after confirming the fingerprint through a trusted channel:

```bash
gpg --import /tmp/USERNAME.github.gpg
rm /tmp/USERNAME.github.gpg
```

For GitLab.com or self-managed GitLab, replace the URL with the matching `.gpg` endpoint described above.
