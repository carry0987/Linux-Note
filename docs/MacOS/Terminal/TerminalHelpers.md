---
title: Terminal Helper Functions
sidebar_position: 3
---

## Overview

On macOS, Terminal can become much more convenient when you wrap repetitive commands in shell functions. A helper function gives a long command a short name, keeps arguments in one place, and turns a repeated workflow into something you can run in a few keystrokes.

This pattern is useful when you want to:

- hide long command-line options behind a simple command
- reuse the same workflow across different projects
- reduce typing mistakes for commands you run often
- keep personal Terminal workflows organized in one file

## Store Functions in a Helper File

You can keep your custom functions in a separate file such as `~/.bash_function.sh`:

```bash
#!/usr/bin/env bash

php() {
  docker run --rm -it \
    -v "$PWD:/app" \
    -w /app \
    php:8.3-cli "$@"
}

composer() {
  docker run --rm -it \
    -v "$PWD:/app" \
    -w /app \
    composer:2 "$@"
}

fix_preview() {
    killall Finder
}
```

Even if the file name includes `bash`, you can still load it from `zsh`. The file name is just a convention.

## Load the File in zsh

```bash
source ~/.bash_function.sh
```

Reload your shell configuration after editing the file:

```bash
source ~/.zshrc
```

## Example 1: Run CLI Tools with Docker

One of the most useful patterns is running CLI tools through Docker instead of installing them locally.

### PHP

```bash
php() {
  docker run --rm -it \
    -v "$PWD:/app" \
    -w /app \
    php:8.3-cli "$@"
}
```

Usage:

```bash
php -v
php script.php
```

### Composer

```bash
composer() {
  docker run --rm -it \
    -v "$PWD:/app" \
    -w /app \
    composer:2 "$@"
}
```

Usage:

```bash
composer --version
composer install
```

This is a good fit when you want a clean host system and still want the command to feel native in Terminal.

### Why It Works

The key line is:

```bash
docker run --rm -it -v "$PWD:/app" -w /app php:8.3-cli "$@"
```

Breakdown:

- `docker run` starts a container
- `--rm` removes the container after the command exits
- `-it` gives you an interactive terminal session
- `-v "$PWD:/app"` mounts the current directory into the container
- `-w /app` sets the working directory inside the container
- `php:8.3-cli` is the image being used
- `"$@"` forwards all arguments you pass to the function

Because of `"$@"`, the function behaves like a normal command.

## Example 2: Restart Finder Quickly

Some helpers are simply shortcuts for commands that are annoying to remember.

```bash
fix_preview() {
  killall Finder
}
```

Usage:

```bash
fix_preview
```

This is useful when Finder previews or thumbnails behave strangely and you want a fast reset.

## Example 3: Convert a GIF to MP4

Media conversion commands often involve long options. A helper makes the workflow easier to remember.

```bash
gif2mp4() {
  if [ -z ${1} ]; then
    echo 'Please enter the file name'
  else
    if [[ -n ${2} ]]; then
      ffmpeg -r 30 -i ${1}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${2}.mp4
    else
      ffmpeg -r 30 -i ${1}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4
    fi
  fi
}
```

Usage:

```bash
gif2mp4 demo
gif2mp4 demo final-video
```

## Example 4: Compile Simple C Programs

If you often compile small C exercises or local projects, a helper can wrap the common `gcc` flags.

```bash
compile() {
  if [ -z ${1} ]; then
    gcc -o main *.c -lm
  else
    path=$1
    gcc -o main ${path%/}"/"*.c -lm
  fi
}
```

Usage:

```bash
compile
compile src
```

This example is intentionally simple. It is useful for quick local builds, but not as a replacement for a full build system.

## Example 5: Convert File Encodings

Encoding conversions are another good example of a repeated command worth wrapping.

```bash
convertUTF8() {
  if [ -z ${1} ]; then
    echo 'Nothing to convert'
  else
    iconv -f BIG-5 -t UTF-8 $1 > 'utf8_'$1
  fi
}
```

Usage:

```bash
convertUTF8 filename.txt
```

This keeps the original file and writes a converted copy such as `utf8_filename.txt`.

## Example 6: Convert WebP to JPG

```bash
webp2jpg() {
  if [ -z ${1} ]; then
    echo 'Nothing to convert'
  else
    magick $1.webp $1.jpg
  fi
}
```

Usage:

```bash
webp2jpg image-name
```

This is handy when a tool exports `.webp` files but another workflow still expects `.jpg`.

## Writing Your Own Helpers

When you create your own functions:

- choose names that are short but still clear
- validate required arguments when a missing value would cause confusion
- use `"$@"` when you want to forward all arguments to another command
- keep one helper focused on one job
- keep destructive workflows separate and clearly named

## Generic Template

```bash
helper_name() {
  if [ -z ${1} ]; then
    echo 'Missing argument'
  else
    some-command "$@"
  fi
}
```

You can start simple and refine later as the workflow becomes more stable.

## Summary

Terminal helper functions are a practical way to make macOS command-line work faster and more consistent. Some wrap containers, some hide repetitive flags, and some turn personal workflows into commands you can remember.

The best helpers are the ones that solve small problems repeatedly.