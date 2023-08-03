import type { Plugin } from 'vite';

export default function (): Plugin {
	const env = Object.entries(process.env);
	function filteredEnv(filter: (key: string) => boolean) {
		return Object.fromEntries(env.filter(([k, _]) => is_valid_identifier(k) && filter(k)));
	}
	const public_env = filteredEnv((key) => key.startsWith('PUBLIC_'));
	const private_env = filteredEnv((key) => !key.startsWith('PUBLIC'));

	function toModule(mode: string, visibility: string): string {
		const env = visibility === 'public' ? public_env : private_env;
		if (mode === 'dynamic') {
			return `export const env=${JSON.stringify(env)}`;
		} else {
			return Object.entries(env)
				.map((k, v) => `export const ${k}=${JSON.stringify(v)}`)
				.join(`\n`);
		}
	}

	return {
		name: 'fake-env-plugin',
		enforce: 'pre',
		resolveId(id) {
			if (
				[
					'$env/static/private',
					'$env/static/public',
					'$env/dynamic/private',
					'$env/dynamic/public'
				].includes(id)
			) {
				return `\0${id}`;
			}
		},
		load(id) {
			if (!id.startsWith(`\0$env/`)) {
				return;
			}
			const [_, mode, visibility] = id.split('/');
			return toModule(mode, visibility);
		}
	};
}

function is_valid_identifier(key: string) {
	return valid_re.test(key) && !reserved.has(key);
}

const valid_re = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const reserved = new Set([
	'do',
	'if',
	'in',
	'for',
	'let',
	'new',
	'try',
	'var',
	'case',
	'else',
	'enum',
	'eval',
	'null',
	'this',
	'true',
	'void',
	'with',
	'await',
	'break',
	'catch',
	'class',
	'const',
	'false',
	'super',
	'throw',
	'while',
	'yield',
	'delete',
	'export',
	'import',
	'public',
	'return',
	'static',
	'switch',
	'typeof',
	'default',
	'extends',
	'finally',
	'package',
	'private',
	'continue',
	'debugger',
	'function',
	'arguments',
	'interface',
	'protected',
	'implements',
	'instanceof'
]);
