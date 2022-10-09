# 🦌 Terrabackpack

<img src="https://raw.githubusercontent.com/wyvernbw/terrabackpack/main/screenshot.png" style="border-radius:1rem; display:flex;">
Deno 🦕 scripts to back up Terraria game files 🌲.

## Install 💚
You must have [deno](https://deno.land/) installed in order to use these scripts.

```bash
deno install --allow-read --allow-env --allow-write -n tb https://raw.githubusercontent.com/wyvernbw/terrabackpack/main/src/run.ts
```
Once installed you can run the script with `tb`.
```bash
tb config setup
```


## Usage
### Create a backup 📦
```bash
# back up everything
tb backup all
# back up one of these folders at a time
tb backup [world/player/resourcePacks]
```
### Edit config file 📝
```bash
tb config set <key> <value>
```
possible keys:
* `gamePath` - path to the Terraria game folder
* `backupPath` - path to the backup folder

To reset your config file, run:
```bash
tb config setup
```
