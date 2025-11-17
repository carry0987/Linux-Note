---
title: Installing Homebrew
---

## What is Homebrew?

Homebrew is the most popular package manager for macOS (and Linux). It simplifies the installation of software, libraries, and tools through the command line. With Homebrew, you can easily install, update, and manage thousands of packages.

## Prerequisites

- macOS (or Linux)
- Command Line Tools for Xcode
- Internet connection

## Installing Homebrew

### Quick Installation

Run the following command in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash
```

This script will:
1. Download and install Homebrew
2. Install Command Line Tools for Xcode (if not already installed)
3. Set up the necessary directories and permissions

### Post-Installation Setup

After installation, you may need to add Homebrew to your PATH. The installer will provide specific instructions based on your system.

#### For Apple Silicon Macs (M1/M2/M3)

Add Homebrew to your PATH by adding these lines to your `~/.zshrc`:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

Or manually add to `~/.zshrc`:

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### For Intel Macs

Homebrew is typically installed to `/usr/local` and should already be in your PATH. If needed, add to `~/.zshrc`:

```bash
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

### Verify Installation

Check if Homebrew is installed correctly:

```bash
brew --version
```

You should see output like:
```
Homebrew x.x.x
```

## Basic Homebrew Commands

### Installing Packages

```bash
# Install a package
brew install wget

# Install multiple packages
brew install git node python
```

### Searching for Packages

```bash
# Search for a package
brew search package-name

# Search with regex
brew search /^package/
```

### Managing Packages

```bash
# List installed packages
brew list

# Show package information
brew info package-name

# Update Homebrew itself
brew update

# Upgrade all packages
brew upgrade

# Upgrade specific package
brew upgrade package-name

# Uninstall a package
brew uninstall package-name

# Remove old versions
brew cleanup
```

### Cask (GUI Applications)

Homebrew Cask extends Homebrew to install GUI applications:

```bash
# Install GUI application
brew install --cask google-chrome

# Install multiple applications
brew install --cask visual-studio-code firefox

# List installed casks
brew list --cask

# Uninstall GUI application
brew uninstall --cask google-chrome
```

### Common GUI Applications

```bash
# Browsers
brew install --cask google-chrome firefox brave-browser

# Development tools
brew install --cask visual-studio-code docker iterm2

# Productivity
brew install --cask slack notion discord

# Media
brew install --cask vlc spotify
```

## Maintaining Homebrew

### Check System Health

```bash
# Check for potential problems
brew doctor

# Display useful statistics
brew info
```

### Update and Cleanup

```bash
# Update Homebrew and all formulae
brew update

# Upgrade all outdated packages
brew upgrade

# Remove old versions and cache
brew cleanup

# See what would be cleaned up
brew cleanup -n
```

### List Outdated Packages

```bash
brew outdated
```

## Uninstalling Homebrew

If you need to remove Homebrew completely:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

## Troubleshooting

### Permission Issues

If you encounter permission errors:

```bash
sudo chown -R $(whoami) $(brew --prefix)/*
```

### Reset Homebrew

If Homebrew isn't working correctly:

```bash
# Reinstall Homebrew
rm -rf $(brew --prefix)/*
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Clear Cache

If installations are failing:

```bash
rm -rf ~/Library/Caches/Homebrew/*
brew cleanup
```

## Useful Tips

### Create a Brewfile

Save your installed packages to a file for easy restoration:

```bash
# Export installed packages
brew bundle dump --file=~/Brewfile

# Install from Brewfile
brew bundle --file=~/Brewfile
```

Example `Brewfile`:
```ruby
# Taps
tap "homebrew/bundle"
tap "homebrew/cask"

# Packages
brew "git"
brew "node"
brew "python"
brew "wget"

# Applications
cask "visual-studio-code"
cask "google-chrome"
cask "docker"
```

### Pin a Package Version

Prevent a package from being upgraded:

```bash
# Pin a package
brew pin package-name

# Unpin a package
brew unpin package-name

# List pinned packages
brew list --pinned
```

### Services Management

Homebrew can manage background services:

```bash
# List all services
brew services list

# Start a service
brew services start mysql

# Stop a service
brew services stop mysql

# Restart a service
brew services restart mysql
```

## Popular Packages to Install

### Development Tools

```bash
brew install git node python3 go rust
brew install --cask visual-studio-code docker
```

### Command Line Tools

```bash
brew install wget curl htop tree jq
brew install tmux vim neovim
```

### Database Tools

```bash
brew install mysql postgresql redis mongodb-community
```

## References

- [Homebrew Official Website](https://brew.sh/)
- [Homebrew Documentation](https://docs.brew.sh/)
- [Homebrew GitHub Repository](https://github.com/Homebrew/brew)
- [Homebrew Formulae](https://formulae.brew.sh/)
