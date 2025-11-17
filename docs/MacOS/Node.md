---
title: Installing Node.js on macOS
---

## Prerequisites

Before installing Node.js, make sure you have [Homebrew](./Homebrew.md) installed on your system.

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Installing Node.js

### Option 1: Install Latest Version (Recommended)

Install the latest stable version of Node.js:

```bash
brew install node
```

Verify the installation:

```bash
# Check Node.js version
node -v

# Check npm version
npm -v
```

This will symlink Node.js binaries to `/opt/homebrew/bin` (Apple Silicon) or `/usr/local/bin` (Intel), making them immediately available in your PATH.

### Option 2: Install Specific Version

If you need a specific version of Node.js:

```bash
# Install a specific major version (e.g., Node.js 20)
brew install node@20

# Or another version
brew install node@24
```

## Important: Keg-Only Versions

⚠️ **Critical Notice**: When installing a specific version like `node@20` or `node@24`, Homebrew installs it as **keg-only**, which means:

- The binaries are **NOT automatically symlinked** to your PATH
- Running `node -v` will fail or show a different version
- You must manually configure your PATH to use this version

### What is Keg-Only?

Homebrew uses "keg-only" to prevent conflicts when multiple versions of the same package exist. The latest `node` formula is the default, while versioned formulas like `node@20` are installed separately.

### Configuring PATH for Keg-Only Versions

#### Temporary Usage (Current Session Only)

```bash
# For Node.js 20
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"

# For Node.js 24
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
```

#### Permanent Configuration

Add the following to your `~/.zshrc` file:

```bash
# For Node.js 20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc

# For Node.js 24
echo 'export PATH="/opt/homebrew/opt/node@24/bin:$PATH"' >> ~/.zshrc
```

Then reload your shell configuration:

```bash
source ~/.zshrc
```

#### For Intel Macs

Replace `/opt/homebrew` with `/usr/local`:

```bash
# Node.js 20 on Intel Mac
echo 'export PATH="/usr/local/opt/node@20/bin:$PATH"' >> ~/.zshrc
```

### Compiler Flags (For Native Modules)

If you're building native Node.js modules (with node-gyp), you may need to set compiler flags:

#### Apple Silicon

```bash
# For Node.js 24
export LDFLAGS="-L/opt/homebrew/opt/node@24/lib"
export CPPFLAGS="-I/opt/homebrew/opt/node@24/include"
```

#### Intel Mac

```bash
# For Node.js 24
export LDFLAGS="-L/usr/local/opt/node@24/lib"
export CPPFLAGS="-I/usr/local/opt/node@24/include"
```

Add these to your `~/.zshrc` if you frequently compile native modules.

## Managing Multiple Node.js Versions

### Using Homebrew Only

If you have multiple versions installed:

```bash
# List all installed Node.js versions
brew list | grep node

# Unlink current version
brew unlink node

# Link specific version
brew link --overwrite node@20

# Switch back to latest
brew unlink node@20
brew link node
```

### Using nvm (Recommended for Multiple Versions)

For better version management, consider using [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm):

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install multiple Node.js versions
nvm install 20
nvm install 22
nvm install node  # Latest

# Switch between versions
nvm use 20
nvm use 22

# Set default version
nvm alias default 20

# List installed versions
nvm ls
```

**Note**: When using nvm, it's recommended to uninstall Homebrew Node.js to avoid conflicts:

```bash
brew uninstall node
brew uninstall node@20
brew uninstall node@24
```

## Verifying Installation

After setting up your PATH correctly:

```bash
# Check Node.js version
node -v

# Check npm version
npm -v

# Check installation path
which node

# View Node.js info
node --version
npm --version
```

Expected output:
```
node -v      # v24.11.1 (or your installed version)
npm -v       # 11.6.2 (or corresponding npm version)
which node   # /opt/homebrew/opt/node@24/bin/node
```

## Troubleshooting

### Command Not Found

If you get `command not found: node`:

1. **Check if Node.js is installed**:
   ```bash
   brew list | grep node
   ```

2. **Verify the installation directory**:
   ```bash
   ls -la /opt/homebrew/opt/node@24/bin/
   ```

3. **Check your PATH**:
   ```bash
   echo $PATH | grep node
   ```

4. **Add to PATH manually**:
   ```bash
   export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
   source ~/.zshrc
   ```

### Wrong Version Showing

If `node -v` shows a different version:

```bash
# Check all node executables in PATH
which -a node

# Unlink conflicting versions
brew unlink node
brew link --overwrite node@24

# Or adjust PATH order in ~/.zshrc
# Ensure the desired version's path comes first
```

### Permission Errors

If you encounter permission issues with npm:

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /opt/homebrew/lib/node_modules
```

### Reinstallation

If Node.js is not working correctly:

```bash
# Uninstall
brew uninstall node
brew uninstall node@24

# Clean up
brew cleanup

# Reinstall
brew install node@24

# Reconfigure PATH
echo 'export PATH="/opt/homebrew/opt/node@24/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Updating Node.js

### Update Latest Version

```bash
brew update
brew upgrade node
```

### Update Specific Version

```bash
brew update
brew upgrade node@24
```

### Check for Outdated Versions

```bash
brew outdated | grep node
```

## Uninstalling Node.js

```bash
# Uninstall specific version
brew uninstall node@24

# Uninstall latest version
brew uninstall node

# Remove all Node.js related packages
brew uninstall --force node node@20 node@24

# Clean up
brew cleanup
```

## Best Practices

1. **For general development**: Use the latest stable version (`brew install node`)
2. **For specific project requirements**: Use nvm to manage multiple versions
3. **For production-like environments**: Match the version used in production
4. **Always check PATH**: Ensure the correct Node.js binary is first in your PATH
5. **Document project requirements**: Use `.nvmrc` or `package.json` engines field

### Example .nvmrc

Create a `.nvmrc` file in your project root:

```
20.10.0
```

Then use:
```bash
nvm use
```

### Example package.json engines

```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=9.0.0"
  }
}
```

## Additional Tools

### Global npm Packages

```bash
# Install commonly used global packages
npm install -g yarn pnpm
npm install -g typescript ts-node
npm install -g nodemon pm2
```

### Check Global Packages

```bash
# List global packages
npm list -g --depth=0
```

## References

- [Node.js Official Website](https://nodejs.org/)
- [Homebrew Node Formula](https://formulae.brew.sh/formula/node)
- [nvm GitHub Repository](https://github.com/nvm-sh/nvm)
- [npm Documentation](https://docs.npmjs.com/)