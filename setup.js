import { fs, path } from './deps.ts';

async function input(question, default_value) {
	const value = await prompt(question);
	return value === null ? default_value : value;
}

function writeJson(path, data) {
	try {
		Deno.writeTextFileSync(path, JSON.stringify(data));
		return 'written to ' + path;
	} catch (error) {
		return error.message;
	}
}

export async function runSetup() {
	const home_dir = Deno.env.get('HOME');
	const config_path = path.join(home_dir, '/.terrabackpack/config.json');
	console.log(config_path);

	const config = {
		game_path: null,
		tmodloader_path: null,
		backup_path: null,
	};

	const default_game_path = path.join(
		home_dir,
		'Documents/My Games/Terraria'
	);
	config.game_path = await input(
		`🌿 what is your game path? (default is ${default_game_path}) : `,
		default_game_path
	);

	const default_tmodloader_path = path.join(config.game_path, 'tModLoader');
	config.tmodloader_path = await input(
		`🌿 what is your tmodloader path?
    (default is ${default_tmodloader_path}) : `,
		default_tmodloader_path
	);

	const default_backup_path = path.join(config.game_path, 'backups');
	config.backup_path = await input(
		`🌿 where do you want to save your backups?
    (default is ${default_backup_path}) : `,
		default_backup_path
	);

	await fs.emptyDir(path.dirname(config_path));
	writeJson(config_path, config);

	console.log('%c🛠️  setup complete!', 'color: green');
}
