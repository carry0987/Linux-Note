---
title: Htop
---

`Htop` is a terminal-based system monitor. It is similar to `top`, but allows you to scroll vertically and horizontally, so you can see all the processes running on the system, along with their full command lines.

#### Installation:
WGET
``` bash
wget -N --no-cache --no-check-certificate https://carry0987.github.io/Linux-Note/data/Htop/htop-setup.sh && chmod +x htop-setup.sh && bash htop-setup.sh
```
CURL
```bash
curl -H 'Cache-Control: no-cache' -O https://carry0987.github.io/Linux-Note/data/Htop/htop-setup.sh && chmod +x htop-setup.sh && bash htop-setup.sh
```

### htoprc
`htop` can be configured by editing `~/.config/htop/htoprc`. The following is my `htoprc` file:
```bash
# Beware! This file is rewritten by htop when settings are changed in the interface.
# The parser is also very primitive, and not human-friendly.
fields=0 48 17 18 38 39 40 2 46 47 49 1
sort_key=46
sort_direction=-1
tree_sort_key=0
tree_sort_direction=1
hide_kernel_threads=1
hide_userland_threads=0
shadow_other_users=0
show_thread_names=0
show_program_path=1
highlight_base_name=0
highlight_megabytes=1
highlight_threads=1
highlight_changes=0
highlight_changes_delay_secs=5
find_comm_in_cmdline=1
strip_exe_from_cmdline=1
show_merged_command=0
tree_view=0
tree_view_always_by_pid=0
header_margin=1
detailed_cpu_time=0
cpu_count_from_one=0
show_cpu_usage=1
show_cpu_frequency=0
show_cpu_temperature=0
degree_fahrenheit=0
update_process_names=0
account_guest_in_cpu_meter=0
color_scheme=0
enable_mouse=1
delay=15
left_meters=Hostname NetworkIO DiskIO CPU Memory Swap
left_meter_modes=2 2 2 1 1 1
right_meters=DateTime Uptime Tasks LoadAverage Systemd
right_meter_modes=2 2 2 2 2
hide_function_bar=0
```
