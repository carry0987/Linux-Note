---
title: Jupyter Notebook
sidebar_position: 2
---

### Install Jupyter Notebook
Install *`Jupyter Notebook`*:
```bash
conda install notebook -y
pip install numpy  --upgrade
pip install pandas  --upgrade
pip install matplotlib  --upgrade
pip install scikit-learn  --upgrade
pip install scipy  --upgrade
pip install plotly  --upgrade
```

Generate config file for *`Jupyter Notebook`*:
```bash
jupyter notebook --generate-config --notebook-dir="/Users/$USER/Documents/Project/AI/Jupyter" --no-browser
```

### MacOS
Install the following packages for **`Apple Silicon`** core:
```bash
conda install -c apple tensorflow-deps --upgrade
pip install tensorflow --upgrade
pip install tensorflow-metal --upgrade
```
