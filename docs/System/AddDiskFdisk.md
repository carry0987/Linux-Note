---
title: Add and Mount a New Disk with fdisk
sidebar_position: 2
---

# Add and Mount a New Disk with `fdisk`

This guide prepares a new disk with a GPT partition table, formats it as ext4, mounts it permanently, and creates a convenient link in the current user's home directory.

For the recommended command-driven approach, see [Add and Mount a New Disk with parted](./AddDiskParted.md). Use this guide when you prefer `fdisk`'s interactive interface.

:::danger

Creating a new GPT partition table destroys the existing partition table and makes existing data inaccessible. Continue only after confirming that the target disk is new or that its data can be erased.

:::

## Identify the New Disk

List disks, filesystems, and mount points before selecting the target disk:

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,UUID,MOUNTPOINTS
```

This guide uses `/dev/sdb` as an example. Replace it with the target disk shown by `lsblk`.

- A SATA, USB, or virtual disk usually uses `/dev/sdb` and its first partition is `/dev/sdb1`.
- An NVMe disk usually uses `/dev/nvme0n1` and its first partition is `/dev/nvme0n1p1`.

:::caution

Do not identify a disk by its letter alone. Confirm its size and ensure that it has no required mount points before continuing.

:::

## Create a GPT Partition

Open the target disk in `fdisk`:

```bash
sudo fdisk /dev/sdb
```

At the `fdisk` prompt, enter the following commands. Press Enter when prompted to accept the default partition number, first sector, and last sector.

```text
g
n
<Enter>
<Enter>
<Enter>
w
```

`g` creates a new GPT partition table, `n` creates one partition, and `w` writes the changes to disk.

Ask the kernel to reload the partition table, then inspect the result:

```bash
sudo partprobe /dev/sdb
sudo udevadm settle
sudo fdisk -l /dev/sdb
```

## Format the Partition

Format the new partition as ext4 and assign it the `hd` label:

```bash
sudo mkfs.ext4 -L hd /dev/sdb1
```

For an NVMe disk, use the matching partition path, such as `/dev/nvme0n1p1`.

## Create the Mount Point

This guide uses `/mnt/hd` for an administrator-managed data disk:

```bash
sudo mkdir -p /mnt/hd
sudo chown "$USER:$USER" /mnt/hd
```

:::tip

Use `/srv/<name>` when the disk stores data served by a system service. `/media/hd` is better suited to removable media managed by a desktop environment; it can still be used by replacing `/mnt/hd` consistently in the commands and `fstab` entry.

:::

## Configure Automatic Mounting

Find the partition UUID:

```bash
sudo blkid -s UUID -o value /dev/sdb1
```

Open `fstab` in Vim:

```bash
sudo vim /etc/fstab
```

Add one line, replacing `YOUR_UUID` with the value returned by `blkid`:

```fstab
UUID=YOUR_UUID /mnt/hd ext4 defaults,nofail,x-systemd.device-timeout=10s 0 2
```

`nofail` allows the system to boot when an external disk is unavailable. Omit `nofail` for an internal disk that must always be present.

:::caution

An invalid `fstab` entry can prevent normal boot. Test the entry before restarting the system.

:::

```bash
sudo mount -a
findmnt /mnt/hd
df -h /mnt/hd
```

## Create a Home Directory Link

Create a symbolic link so the mounted disk is available as `~/hd`:

```bash
ln -s /mnt/hd "$HOME/hd"
ls -ld "$HOME/hd"
```

:::note

Use a symbolic link for a mounted directory. A hard link cannot point to a directory and cannot cross filesystem boundaries, so it cannot link `/mnt/hd` into the home directory.

:::

The disk is now accessible through both `/mnt/hd` and `~/hd`.
