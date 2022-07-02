# 🦌 Terrabackpack

Scripts to quickly backup your Terraria worlds and players.

## Install 😎

**To run these scripts you need to have [deno](https://deno.land/) installed on your system.**  
Install:

```
git clone https://github.com/wyvernbw/terraria-backup
deno install --allow-read --allow-write --allow-env -n terrabackpack index.js
```

For ease of use add `.deno/bin` to your PATH. You can do that with the command provided by deno install.

### Easy mode 🤓

If you don't want to `deno install` you can use the provided tasks.
See all tasks with `deno task`.

```
git clone https://github.com/wyvernbw/terraria-backup
deno task start
```

### Lazy mode (quick) 🚗💨

You can run the scripts off github directly.

```
deno run --allow-read --allow-write --allow-env https://raw.githubusercontent.com/wyvernbw/terraria-backup/main/index.js setup
deno run --allow-read --allow-write https://raw.githubusercontent.com/wyvernbw/terraria-backup/main/index.js backup
```

## Usage

After first installing the script, run

```
terrabackpack setup
```

When you want to back your files up, run

```
terrabackpack
# or
terrabackpack backup
```
