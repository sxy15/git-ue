## Install

```bash
pnpm install git-ue-manager -g
```

> node version >= 20

## Usage

```bash

Usage: gum [options] [command]

a tool for git switch user and email

Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  add [options]              add user.name and user.email
  current                    show current user.name and user.email
  ls                         show all alias
  use [alias]                use alias config
  rm [alias]                 remove alias config
  rename [alias] [newAlias]  rename alias
  bind <alias>               bind current git remote to alias
  check                      check git config
  lsb                        show the remote all bind
  help [command]             display help for command
```

## husky Example

hook -> pre-push
```bash
gum check
```