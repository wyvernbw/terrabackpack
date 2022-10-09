import { Option } from './run.ts';
import { join } from 'https://deno.land/std@0.149.0/path/mod.ts';
import { loadConfig } from './config.ts';
import { copy } from './deps.ts';

const backup = async (folders: string[]) => {
	const config = await loadConfig();

	console.log('%c📋 backing up files...', 'color: orange');
	console.time('time elapsed');
	folders.forEach(folder => {
		copy(
			join(config.gamePath, folder),
			join(config.backupPath, 'base', folder),
			{ overwrite: true }
		);
		copy(
			join(config.gamePath, 'tModLoader', folder),
			join(config.backupPath, 'modded', folder),
			{ overwrite: true }
		);
		console.log(`\t✨ ${folder} => done`);
	});
	console.log('%c🦌 backup complete!', 'color: green');
	console.timeEnd('time elapsed');
};

export const options: Option = {
	all: {
		run: () => backup(['Worlds', 'Players', 'ResourcePacks']),
	},
	worlds: {
		run: () => backup(['Worlds']),
	},
	players: {
		run: () => backup(['Players']),
	},
	resourcePacks: {
		run: () => backup(['ResourcePacks']),
	},
};
