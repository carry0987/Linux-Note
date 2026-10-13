---
title: Sign GitHub and GitLab Commits with GPG
sidebar_position: 3
---

# Sign GitHub and GitLab Commits with GPG

This guide configures one GPG key for signed commits on both GitHub and GitLab. It uses a GitHub no-reply address as the default global identity, then overrides the email address in each GitLab repository.

The same GPG key can contain multiple user IDs (UIDs), so a separate key is not required for each platform.

## Workflow

1. [Prepare Git and GnuPG](./GPG/Setup.md): Install the required tools, configure the global `.gitconfig`, then create or select a signing key.
2. [Add GPG Identities and Upload the Key](./GPG/Identities.md): Add the verified GitHub and GitLab email UIDs, optionally set local owner trust, and upload the updated public key.
3. [Configure and Verify Signed Commits](./GPG/Signing.md): Enable automatic signatures, set the local GitLab identity, test a commit, and troubleshoot failures.
