---
title: Git
---

### Find credentials all over the place
```bash
docker run --platform linux/arm64 -it -v "$PWD:/pwd" trufflesecurity/trufflehog:latest github --repo [URL_OF_REPO] --token=[GITHUB_PERSONAL_ACCESS_TOKEN]
```

### Git Case Sensitivity
If you are facing issues with case sensitivity in git, you can disable it by running the following command.
> This will make git case sensitive. Note that MacOS is case insensitive by default.  
> So, if you are using MacOS, you should run the following command to make git case sensitive.

```bash
git config --global core.ignorecase false
```

For reset helpers, signed-commit identity switching, and more complete Git command guidance, see [Git Command Reference](./Command.md).

For GitHub and GitLab GPG commit signing on one computer, see [Sign GitHub and GitLab Commits with GPG](./GPGSigning.md).

For GitHub and GitLab SSH authentication, published public-key endpoints, and server `authorized_keys` setup, see [Authenticate GitHub and GitLab with SSH](./SSHAuthentication.md).

For `gh-pages` and orphan branch workflows, see [Creating Orphan Branches](./OrphanBranch.md).
