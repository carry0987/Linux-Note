# Dependency of SSR

jq-1.5.tar.gz
======

- Description : JQ is an JSON parser for Linux
- Dependency for : ssr.sh

### Installation
Debian/Ubuntu OS：
``` bash
apt-get install -y build-essential
wget --no-check-certificate -N "https://carry0987.github.io/Linux-Note/data/Proxy/SSR/other/jq-1.5.tar.gz"
tar -xzf jq-1.5.tar.gz && cd jq-1.5
./configure --disable-maintainer-mode && make && make install
ldconfig
cd .. && rm -rf jq-1.5.tar.gz && rm -rf jq-1.5
```
