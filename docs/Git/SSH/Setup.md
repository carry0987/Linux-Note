---
title: Create and Load an SSH Key
---

# Create and Load an SSH Key

Use a modern `ed25519` key for GitHub and GitLab unless a legacy service explicitly requires RSA.

## Check for an Existing Key

Before generating a key, inspect the default SSH directory:

```bash
ls -al ~/.ssh
```

Common public-key filenames include `id_ed25519.pub`, `id_ecdsa.pub`, and `id_rsa.pub`. If a matching private key exists without the `.pub` suffix, it can be loaded into `ssh-agent` and its public key can be uploaded. Do not overwrite an existing private key unless it is no longer needed.

## Generate the Key Pair

Create the SSH directory with restrictive permissions, then generate a key. Replace the comment with an email address or a label that identifies the key owner.

```bash
install -d -m 700 ~/.ssh
ssh-keygen -t ed25519 -a 100 -f ~/.ssh/id_ed25519 -C "you@example.com"
```

Enter a strong passphrase when prompted. The private key remains in `~/.ssh/id_ed25519`; the public key to upload is `~/.ssh/id_ed25519.pub`.

For a legacy service that does not support Ed25519, generate a 4096-bit RSA key instead:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -C "you@example.com"
```

Do not generate a DSA (`ssh-dss`) key. GitHub does not accept new DSA keys, and they are obsolete.

Display the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Record its fingerprint so that it can be compared after upload or download:

```bash
ssh-keygen -lf ~/.ssh/id_ed25519.pub
```

:::caution

Do not copy, upload, email, or commit `~/.ssh/id_ed25519`. Anyone with that private key and its passphrase can authenticate as you.

:::

## Load the Key into `ssh-agent`

Start the agent for the current shell, then load the private key:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

On macOS, save the passphrase in the keychain:

```bash
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

To load the key automatically in future macOS sessions, add the following host entry to `~/.ssh/config`. Adjust `IdentityFile` when the key has a different name:

```sshconfig
Host github.com gitlab.com
	AddKeysToAgent yes
	UseKeychain yes
	IdentityFile ~/.ssh/id_ed25519
```

Restrict the configuration file after creating or updating it:

```bash
chmod 600 ~/.ssh/config
```

Confirm that the agent has loaded the expected key:

```bash
ssh-add -l
```

Continue with [Add the Key to GitHub and GitLab](./Identities.md).
