import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import { join } from 'https://deno.land/std@0.149.0/path/mod.ts';
import { assert } from 'https://deno.land/std@0.159.0/testing/asserts.ts';
import { ensureFile } from 'https://deno.land/std@0.159.0/fs/mod.ts';
import { z } from './deps.ts';

const configPath = join(Deno.cwd(), 'tb_config.json');

const configSchema = z.object({
	gamePath: z.string().min(1),
	backupPath: z.string().min(1),
});

const loadConfig = async () => {
	await ensureFile(configPath);
	const config = configSchema.safeParse(
		JSON.parse((await Deno.readTextFile(configPath)) || '{}')
	);
	if (!config.success) {
		console.error(
			'%c 💢 Config file is invalid, please run `tb config setup`',
			'color: red'
		);
		Deno.exit();
	} else {
		return config.data;
	}
};

const setup = async () => {
	const getDefaultPath = () => {
		const platform = os.platform();
		const gamePaths = {
			windows: `${join(os.homeDir() ?? '~', 'Documents/My Games/Terraria')}`,
			linux: `${join(os.homeDir() ?? '~', '.local/share/Terraria')}`,
			darwin: `${join(
				os.homeDir() ?? '~',
				'Library/Application Support/Terraria'
			)}`,
		};
		const defaultPath = gamePaths[platform];
		assert(defaultPath, `Unsupported platform: ${platform}`);
		return defaultPath;
	};

	const defaultPath = getDefaultPath();
	const gamePath = prompt(
		'Enter the path to your Terraria folder',
		defaultPath
	);
	const backupPath = prompt(
		'Enter the path to your backup folder',
		join(defaultPath, 'Backups')
	);
	const configObj = JSON.stringify({ gamePath, backupPath });
	await Deno.writeTextFile(configPath, configObj);
};

const set = async () => {
	const config = await loadConfig();
	const validKeys = z.enum(['gamePath', 'backupPath']);
	const key = validKeys.parse(Deno.args[1]);
	const value = Deno.args[2];
	const configObj = JSON.stringify({ ...config, [key]: value });
	await Deno.writeTextFile(configPath, configObj);
};

export const options = {
	setup: {
		run: () => setup(),
	},
	set: {
		run: () => set(),
	},
};
