---
title: Add and Mount a New Disk with parted
sidebar_position: 1
---

# Add and Mount a New Disk with `parted`

This guide prepares a new disk with a GPT partition table, formats it as ext4, mounts it permanently, and creates a convenient link in the current user's home directory.

Use this recommended guide for new disks, including disks larger than 2 TiB. For an interactive `fdisk` alternative, see [Add and Mount a New Disk with fdisk](./AddDiskFdisk.md).

:::danger

Creating a new GPT partition table destroys the existing partition table and makes existing data inaccessible. Continue only after confirming that the target disk is new or that its data can be erased.

:::

## Identify the New Disk

List disks before selecting the target disk:

```bash
lsblk
```

This guide uses `/dev/sdb` as an example. Replace it with the target disk shown by `lsblk`.

- A SATA, USB, or virtual disk usually uses `/dev/sdb` and its first partition is `/dev/sdb1`.
- An NVMe disk usually uses `/dev/nvme0n1` and its first partition is `/dev/nvme0n1p1`.

:::caution

Do not identify a disk by its letter alone. Confirm its size and ensure that it has no required mount points before continuing.

:::

### Optional: Inspect Detailed Disk Information

Use this form of `lsblk` to show filesystem types, labels, UUIDs, and mount points:

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,UUID,MOUNTPOINTS
```

### Optional: Reuse an Existing Disk

If you are intentionally reusing an existing mounted partition, unmount it before recreating the partition table:

```bash
sudo umount /dev/sdb1
```

## Create a GPT Partition

Install `parted` if it is not already available:

```bash
sudo apt update
sudo apt install parted
```

Open the target disk in `parted`:

```bash
sudo parted /dev/sdb
```

At the `parted` prompt, enter the following commands:

```text
mklabel gpt
mkpart primary ext4 1MiB 100%
quit
```

`mklabel gpt` creates a GPT partition table. `mkpart` creates one partition from `1MiB` to the end of the disk, and `quit` exits `parted`.

Ask the kernel to reload the partition table, then inspect the result:

```bash
sudo partprobe /dev/sdb
lsblk /dev/sdb
```

:::note

The `ext4` value in `mkpart` records the intended filesystem type in the partition metadata. It does not format the partition; the next step creates the filesystem.

:::

### Optional: Run `parted` Non-interactively

Use the following command in a provisioning script or when you have already verified the target disk:

```bash
sudo parted --script --align optimal /dev/sdb \
  mklabel gpt \
  mkpart primary ext4 1MiB 100%
```

- `--script` runs the commands without opening the interactive prompt or asking for confirmation.
- `--align optimal` asks `parted` to align the partition according to the disk's reported optimal I/O boundaries. Starting at `1MiB` is already appropriate for most disks; this option is mainly useful for automated or performance-sensitive setups.

After `partprobe`, automation scripts that must wait for the new partition device can run:

```bash
sudo udevadm settle
```

This waits for udev to finish device-event processing. It is usually unnecessary for an interactive session; if `/dev/sdb1` is already present, continue to the next step.

## Format the Partition

Format the new partition as ext4:

```bash
sudo mkfs.ext4 /dev/sdb1
```

For an NVMe disk, use the matching partition path, such as `/dev/nvme0n1p1`.

### Optional: Add a Filesystem Label

Use this command instead of the previous `mkfs.ext4` command to assign the filesystem the `hd` label. A label is convenient for people reading `lsblk`, but UUID-based mounting does not require it.

```bash
sudo mkfs.ext4 -L hd /dev/sdb1
```

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
UUID=YOUR_UUID /mnt/hd ext4 defaults 0 2
```

Use `defaults` for an internal disk that must always be present.

### Optional: Support an Unavailable External Disk

For a removable or external disk, use this entry instead so the system can still boot when the disk is unavailable:

```fstab
UUID=YOUR_UUID /mnt/hd ext4 defaults,nofail 0 2
```

### Optional: Limit the Boot-time Device Wait

On a systemd-based system, add `x-systemd.device-timeout=10s` to the external-disk entry when boot should wait no more than ten seconds for the device:

```fstab
UUID=YOUR_UUID /mnt/hd ext4 defaults,nofail,x-systemd.device-timeout=10s 0 2
```

This option is not required for normal mounts; it only changes how long systemd waits for the device during boot.

:::caution

An invalid `fstab` entry can prevent normal boot. Test the entry before restarting the system.

:::

```bash
sudo mount -a
df -h /mnt/hd
```

### Optional: Verify the Mounted Source

For additional verification of the mounted source and options, run:

```bash
findmnt /mnt/hd
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
