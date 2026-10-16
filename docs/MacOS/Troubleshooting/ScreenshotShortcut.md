---
title: Screenshot Shortcut
sidebar_position: 1
---

Use these steps when `Shift + Command + 4` does not start a selection screenshot. Test the shortcut after each step.

### Restart SystemUIServer

```bash
killall SystemUIServer
```

This restarts the current user's SystemUIServer process. Menu bar icons may briefly disappear and reappear. It does not restart the Mac, close normal applications, delete files, or reset preferences.

If the command reports that no matching process was found, continue to the next step without using `sudo`.

### Restart the Dock

```bash
killall Dock
```

Wait for the Dock to reappear, then test the shortcut. This can help with temporary desktop-interface issues, but the Dock does not directly control screenshot shortcuts.

### Test Interactive Capture Directly

```bash
screencapture -i ~/Desktop/test.png
```

If the capture cursor appears, select an area to save a screenshot to `~/Desktop/test.png`. Press `Esc` to cancel. Use another file name first if that file already exists.

| Result | Likely meaning | Next step |
| --- | --- | --- |
| A screenshot is saved | The capture feature works; the shortcut may be disabled or intercepted | Check macOS screenshot shortcuts and applications that use the same shortcut |
| No capture cursor appears | The issue may involve capture processes, permissions, or the current environment | Review terminal errors and macOS permission prompts |
| An area can be selected, but no file is saved | The issue may involve the save location or write permissions | Check the desktop location, terminal errors, and whether `Esc` was pressed |
| An error appears | More information is required | Keep the complete error message for further diagnosis |

If macOS asks for screen-recording permission, follow the prompt and check the Terminal app's permissions.
