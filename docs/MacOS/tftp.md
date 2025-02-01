---
title: TFTP
sidebar_position: 3
---

### Start TFTP server
Activate the tftp server on your Mac:
To change the properties, edit the file
```bash
/System/Library/LaunchDaemons/tftp.plist
```

The default directory is `/private/tftpboot`.

Make this directory accessible for everybody.
```bash
sudo chmod 777 /private/tftpboot
sudo launchctl start com.apple.tftpd
```

And start it with
```bash
sudo launchctl load -F /System/Library/LaunchDaemons/tftp.plist
```

### Stop TFTP server
If you want to stop the daemon, do
```bash
sudo launchctl unload /System/Library/LaunchDaemons/tftp.plist
sudo launchctl stop com.apple.tftpd
```

Change back the permissions of the directory to `/private/tftpboot`
```bash
sudo chmod 755 /private/tftpboot
```
