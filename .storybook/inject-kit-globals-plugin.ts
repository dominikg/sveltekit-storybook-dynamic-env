import type { Plugin } from 'vite';

export default function (): Plugin {
    const env = Object.entries(process.env);
    function filteredEnv(prefix: string): Record<string, string|undefined> {
        return Object.fromEntries(env.filter(([k, _]) => is_valid_identifier(k) && k.startsWith(prefix)));
    }
    // better to read this from svelte config, unfortunately in vite config it is not set, there it is `VITE_ and STORYBOOK_`
    const publicPrefix = 'PUBLIC_';
    // what about private prefix

    return {
        name: 'inject-kit-globals-plugin',
        transformIndexHtml(){
            return[{
                    tag: "script",
                    // this only sets __sveltekit_dev, but would need to set __sveltekit_somehash for builds
                    children: `(window.__sveltekit_dev = window.__sveltekit_dev || {}).env=${JSON.stringify(filteredEnv(publicPrefix))}`
                }]
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
