---
title: Manage multiple versions of Node on your machine
description: Here's how you can install a specific Node version and use different node versions on your machine
tags: [NVM, Node]
---

The best way I’ve tried to do this on my Linux machine is with [nvm](https://github.com/nvm-sh/nvm).

## What's NVM

`nvm` allows you to quickly install and use different versions of Node via the command line.
You can read more about it and how to install it on the [README](https://github.com/nvm-sh/nvm#readme).
`nvm` was originally developed for Linux systems, however it can be installed separately for Windows.

## Install on Linux

To install on Linux run:

```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

    #or
    wget -q0- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Then close and reopen the terminal for the system to recognize the changes or run the command:

```bash
source ~/.bashrc
```

## Install on Windows

`nvm` can be installed on the windows system using the following steps:

1. Go to this [site](https://github.com/coreybutler/nvm-windows/releases)
2. Install and unzip the `nvm-setup.zip` file

## Install on MacOS

No hard feelings Mac users, just jejely follow the instructions [here to install nvm with homebrew](https://tecadmin.net/install-nvm-macos-with-homebrew/).

To verify that it was successful, run:

```bash
nvm --version
```

<!-- ![](https://paper-attachments.dropbox.com/s_C4CE6587E02352D1AC34B3EB0768C873811C626FE830907FA5F5AAACB7A92A3C_1648023529913_image.png) -->

<!-- <img-cont src="https://paper-attachments.dropbox.com/s_C4CE6587E02352D1AC34B3EB0768C873811C626FE830907FA5F5AAACB7A92A3C_1648023529913_image.png" alt="Output of nvm --version in terminal" style="zoom:100%;"></img-cont> -->

:img-cont{src="https://paper-attachments.dropbox.com/s_C4CE6587E02352D1AC34B3EB0768C873811C626FE830907FA5F5AAACB7A92A3C_1648023529913_image.png" alt="Output of nvm --version in terminal"}

Great!
Now, you’re ready to rumble.

You can do a lot with `nvm` here are some examples:

```bash
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)

$ node -v
v16.9.1

$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)

$ node -v
v14.18.0

$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)

$ node -v
v12.22.6
```

Simple as that!

## Install and use the LTS version of Node

This is recommended for most users. To do this run:

```bash
nvm install --lts
```

<!-- ![](https://paper-attachments.dropbox.com/s_C4CE6587E02352D1AC34B3EB0768C873811C626FE830907FA5F5AAACB7A92A3C_1648024445485_image.png) -->

<!-- <img-cont src="https://paper-attachments.dropbox.com/s_C4CE6587E02352D1AC34B3EB0768C873811C626FE830907FA5F5AAACB7A92A3C_1648024445485_image.png" alt="Output of nvm --install in terminal" style="zoom:100%;"></img-cont> -->

:img-cont{src="https://paper-attachments.dropbox.com/s_C4CE6587E02352D1AC34B3EB0768C873811C626FE830907FA5F5AAACB7A92A3C_1648024445485_image.png" alt="Output of nvm --install in terminal"}

Hermoso ✨, now you can go and install that stubborn package.

## Make the new version default

Now, if you close your current terminal and run `node -v` you might notice that it still shows your old node version.

You can try to set a the new version as default:

```bash
nvm alias default v16.14.2
```

Close your terminal and open again to run `node -v` again to check. You should see the new version.

## Make sure to exit open terminals that still show old Node versions

If you’re using VSCode’s terminal for example, you might notice that even if you close the terminal by clicking on the trash can icon, when you open it again, and run `node -v`, it still shows you the old node version.

You’ll have to exit the terminal by running:

```bash
exit
```

When you open it again and check the terminal, you should see the new node version.

## Further reading & resources

- [How to update Node.js and NPM to next version ? - GeekforGeeks](https://www.geeksforgeeks.org/how-to-update-node-js-and-npm-to-next-version/)
- [How to Update Node.js to Latest Version {Linux, Windows, and macOS}](https://phoenixnap.com/kb/update-node-js-version)
- [nvm-sh](https://github.com/nvm-sh)/**[nvm](https://github.com/nvm-sh/nvm)**
- [How To Install NVM on macOS with Homebrew](https://tecadmin.net/install-nvm-macos-with-homebrew/)

Thanks for reading 💖. Let me know if you have any questions or suggestions ✨
