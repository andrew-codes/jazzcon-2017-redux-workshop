#!/usr/bin/env node

const cp = require('child_process');

const spawn = cp.spawn;
const execSync = cp.execSync;

let useYarn = false;
try {
    useYarn = Boolean(execSync('yarn --version'));
}
catch (e) {
    // use npm instead :-(
}

const installer = useYarn ? 'yarn' : 'npm';

console.log(`\n📦  Installing dependencies via \`${installer} install\``);

spawn(installer, [
    'install',
], {
    shell: true,
    stdio: 'inherit',
});
