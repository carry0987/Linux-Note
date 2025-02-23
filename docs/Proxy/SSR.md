---
title: SSR
sidebar_position: 1
---

### ssr.sh
- Description: ShadowsocksR Easy Setup Tool
- Support OS: CentOS 6+ / Debian 6+ / Ubuntu 14+

#### Feature
- Support setting limit of user speed
- Support setting limit of the number of port devices
- Support displaying current connected IP
- Support displaying SS / SSR connection info & QRcode
- Support switching single-port / multi-port mode
- Support easy installation of BBR

#### Note
If you want to get location of IP, you should get the token from [IP-Info](https://ipinfo.io/)

#### Installation
WGET
``` bash
wget -N --no-cache --no-check-certificate https://carry0987.github.io/Linux-Note/data/Proxy/SSR/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```
CURL
```bash
curl -H 'Cache-Control: no-cache' -O https://carry0987.github.io/Linux-Note/data/Proxy/SSR/ssr.sh && chmod +x ssr.sh && bash ssr.sh
```

#### Firewall
Firewall-cmd command for **`SSR`**
```bash
firewall-cmd --permanent --add-port=7382/tcp
firewall-cmd --permanent --add-port=7382/udp
firewall-cmd --reload
```
