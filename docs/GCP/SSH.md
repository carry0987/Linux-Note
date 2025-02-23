---
title: Connect GCP with SSH Key
sidebar_position: 1
---

### Connecting to an Instance via CLI
You can connect to the instance via CLI in two ways - through `gcloud` commands or through `SSH` commands. Here we will primarily discuss SSH.

### Using Existing Public/Private Keys
Usually, public and private keys are stored in the `~/.ssh` directory. The files will appear in pairs with names `my-ssh-key.pub` and `my-ssh-key`, where `my-ssh-key` could be any filename.
>
>Note: In practice, `my-ssh-key` is by default named `id_rsa` and the server reads `id_rsa` as the key. If you want to use another key file, remember to use the `-i` flag.
>
If you have existing public and private keys in your files, you can directly obtain the public key through 
```bash
cat my-ssh-key.pub
```
and store this public key in the Metadata SSH keys. You can then connect by using the following command
```bash
ssh -i ~/.ssh/my-ssh-key [USERNAME]@[IP_ADDRESS]
```
This will establish the connection. 

### Generating New Public/Private Keys
You can generate a new pair of public/private keys using the following command:
```bash
ssh-keygen -t rsa -f ~/.ssh/my-ssh-key -C [USERNAME]
```
Input a passphrase to protect this pair of keys. 
![](./img/ssh-keygen.png)
You can restrict access to the key pair to yourself:
```bash
chmod 400 ~/.ssh/my-ssh-key
```
Next, obtain your public key through
```bash
cat ~/.ssh/my-ssh-key.pub
```
Add this key to the Metadata SSH keys and connect via
```bash
ssh -i ~/.ssh/my-ssh-key [USERNAME]@[IP_ADDRESS]
```

### SSH Command
When we use the SSH command, we connect via
```bash
ssh -i ~/.ssh/my-ssh-key [USERNAME]@[IP_ADDRESS]
```
![](./img/external-ip.png)  
>
>Note1: The username is the username of your Gmail account (username@gmail.com)  
>Note2: You can find the `ip_address` in the instance details.
>

### Checking Whether Your Key is Stored on Google Cloud
If you go to 'Metadata' in the menu now,
![](./img/metadata.png)  
and click on the SSH keys, ideally you should see the following interface  
![](./img/ssh-keys.png)  
This means that Google Compute Engine has stored your key. 
If you hadn't created any instances in this project and made a connection, essentially there would be no key stored. 
You can check the file content in the **`~/.ssh`** directory, and you should see `google_compute_engine.pub` and `google_compute_engine` files. 
These two files represent the public key (pub) and private key generated by Google Cloud for you. 
The one stored on Google Cloud is the public key (`google_compute_engine.pub`).
You can check the content of your public key by typing in the terminal
```bash
cat google_compute_engine.pub
```
The content should be consistent with that stored in the SSH keys section in the Metadata.
