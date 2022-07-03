import { path, fs } from './deps.ts';

export async function makeBackup() {
	const home_dir = Deno.env.get('HOME');
	const config_path = path.join(home_dir, '.terrabackpack/config.json');
	const config = await JSON.parse(await Deno.readTextFile(config_path));

	await fs.emptyDir(config.backup_path);

	const folders = ['Players', 'Worlds', 'ResourcePacks'];

	console.time('✨ time elapsed');
	console.log('📋 copying files...');

	const backup = () =>
		folders.forEach((element) => {
			const base_path = path.join(config.backup_path, 'base', element);
			const modded_path = path.join(
				config.backup_path,
				'modded',
				element
			);

			// copy base game players and worlds
			fs.copy(path.join(config.game_path, element), base_path, {
				overwrite: true,
			});
			// copy modded players and worlds
			fs.copy(path.join(config.tmodloader_path, element), modded_path, {
				overwrite: true,
			});
		});
	await backup();
	console.timeEnd('✨ time elapsed');

	console.log('🦌 backup made!');
}
