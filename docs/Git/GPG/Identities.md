---
title: Add GPG Identities and Upload the Key
---

# Add GPG Identities and Upload the Key

Add a user ID (UID) for each commit email address that GitHub or GitLab should verify.

## Add Email Addresses to the Key

Replace `KEY_ID` with the long key ID selected during [Git and GnuPG Setup](./Setup.md):

```bash
gpg --edit-key KEY_ID
```

At the `gpg>` prompt, add a missing email address:

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

Replace `YOUR_NAME` and `you@example.com` with the name and verified email address. Leave `Comment` empty unless it is required by your organisation. Enter `O` to accept the new UID. GnuPG may then prompt for the key passphrase.

List the key before saving to confirm that the new UID appears, then write the change and leave the editor:

```text
gpg> list
gpg> save
```

Repeat `adduid` for every missing commit email address. Do not add an email address that has not been verified on the corresponding GitHub or GitLab account.

:::note

After `adduid`, the new UID can appear as `[ unknown]` even when the key itself is ultimately trusted. This is a local UID-validity display; it does not prevent signing commits or GitHub/GitLab from marking a valid signature as Verified.

:::

## Optional: Set Owner Trust for Your Own Key

Use this step only for a key whose private key you control. Owner trust applies to the entire key, not one individual UID. A key created on the current computer is usually already ultimately trusted. This step is most useful after importing your private key onto a new computer, because owner trust is stored locally in the GnuPG trust database and is not included when the key is exported or imported.

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
