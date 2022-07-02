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

	default:
		makeBackup();
		break;
}
