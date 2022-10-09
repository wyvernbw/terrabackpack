import { options as ConfigOptions } from './config.ts';
import { z } from './deps.ts';

type Option = {
	run?: () => unknown;
	[key: string]: Option | (() => unknown) | undefined;
};

export const Option: z.ZodType<Option> = z.lazy(() =>
	z.record(z.string(), z.union([Option, z.function().optional()]))
);

const options = {
	config: ConfigOptions,
};

const run = (opts: Option, index = 0) => {
	const arg = Deno.args[index];
	if (arg in opts) {
		const option = Option.parse(opts[arg]);
		if (option.run) {
			option.run();
			return;
		}
		run(option, index + 1);
	} else {
		console.error(
			arg === undefined
				? `%c🙊 please specify a valid option`
				: `%c🙊 Invalid option ${arg}!`,
			'color: red'
		);

		console.error('possible options:');
		Object.keys(opts).forEach(key => console.error(`- ${key}`));
	}
};

run(options);
