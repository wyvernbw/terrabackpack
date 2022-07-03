import { makeBackup } from './backup.js';
import { runSetup } from './setup.js';

// exit the application if user presses CTRL-C
Deno.addSignalListener('SIGINT', () => {
	console.log('interrupted!');
	Deno.exit();
});

const option = Deno.args[0];

switch (option) {
	case 'setup':
		runSetup();
		break;

	case 'backup':
		makeBackup();
		break;

	case 'help':
		console.log('available commands:');
		console.log(
			'%c - setup ',
			'color: yellow',
			': config the paths to your game and backup'
		);
		console.log(
			'%c - backup ',
			'color: yellow',
			': copy your files to the backup path'
		);
		break;

	case undefined:
		makeBackup();
		break;

	default:
		console.log(`%c${option} is not a valid command!`, 'color: red');
		console.log('use terrabackpack help to see all commands');
		break;
}
