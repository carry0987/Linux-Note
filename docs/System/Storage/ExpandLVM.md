---
title: Expand an Ubuntu LVM Volume
sidebar_position: 3
---

# Expand an Ubuntu LVM Volume

Use this guide after increasing the size of a virtual disk or physical disk on an Ubuntu system that uses LVM. It covers the complete path from the enlarged disk to the mounted filesystem.

The examples use Ubuntu's common default LVM layout:

```text
Physical disk -> partition -> LVM physical volume -> volume group -> logical volume -> ext4 filesystem
```

:::caution

Do not run the commands with the example device names until you have confirmed that they match your system. Selecting the wrong disk, partition, or logical volume can make data inaccessible.

:::

## Prerequisites

- Back up important data or create a VM snapshot before changing partitions or storage metadata.
- Increase the virtual disk size in the cloud provider or hypervisor first.
- Ensure the target filesystem is mounted and not reporting I/O errors.
- Install `cloud-guest-utils` if the system does not provide the `growpart` command.

```bash
sudo apt update
sudo apt install cloud-guest-utils
```

## Inspect the Current Layout

Identify the root filesystem, its filesystem type, and the LVM devices behind it.

```bash
findmnt -no SOURCE,FSTYPE /
lsblk -f
sudo pvs
sudo vgs
sudo lvs
```

For a default Ubuntu LVM installation, the root logical volume is commonly shown as `/dev/mapper/ubuntu--vg-ubuntu--lv`. The physical volume may be a partition such as `/dev/sda3` or `/dev/nvme0n1p3`.

Before extending the logical volume, `sudo vgs` must show free space in the `VFree` column. If `VFree` is `0`, continue with the next section to expand the LVM physical volume.

:::tip

If `VFree` already has enough capacity, skip the partition and physical-volume expansion steps and continue with [Extend the Logical Volume](#extend-the-logical-volume).

:::

## Expand the Partition and Physical Volume

This step is required only when the physical disk was enlarged and its LVM partition does not yet use the new capacity. Replace the disk name and partition number with the values shown by `lsblk` and `pvs`.

For an LVM physical volume on `/dev/sda3`:

```bash
sudo growpart /dev/sda 3
sudo pvresize /dev/sda3
```

For an LVM physical volume on `/dev/nvme0n1p3`:

```bash
sudo growpart /dev/nvme0n1 3
sudo pvresize /dev/nvme0n1p3
```

Confirm that the volume group now has free extents:

```bash
sudo vgs
```

## Extend the Logical Volume

The following command assigns all remaining free space in the volume group to the Ubuntu root logical volume:

```bash
sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
```

:::warning

`+100%FREE` consumes all free extents in the volume group. Use a fixed increment instead, such as `-L +20G`, when space must remain available for another logical volume.

:::

If the logical volume has a different name, use the path reported by `sudo lvs` rather than the example path above.

## Expand the Filesystem

For an ext2, ext3, or ext4 filesystem, extend the filesystem after extending the logical volume:

```bash
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

Modern ext4 filesystems can normally be grown while mounted. The filesystem must be grown separately because `lvextend` changes only the logical-volume size.

:::caution

`resize2fs` supports ext2, ext3, and ext4 only. Confirm the filesystem type with `findmnt -no FSTYPE /` before running it.

:::

For an XFS root filesystem, do not use `resize2fs`. After `lvextend`, grow the mounted filesystem instead:

```bash
sudo xfs_growfs /
```

## Verify the Result

Check that the logical volume and root filesystem now report the expected capacity:

```bash
sudo lvs
df -h /
```

If the filesystem size did not increase, verify that the correct logical-volume path was used and that the filesystem type matches the resize command.
