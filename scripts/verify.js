#!/usr/bin/env node

const execSync = require('child_process').execSync;

// returns actualVersion >= desiredVersion
function versionIsGreaterOrEqual(desiredVersion, actualVersion) {
    const versionExpression = /v?(\d+)\.(\d+)\.(\d+)/;
    const desiredVersionParts = versionExpression.exec(desiredVersion);
    const desiredMajor = Number(desiredVersionParts[1]);
    const desiredMinor = Number(desiredVersionParts[2]);
    const desiredPatch = Number(desiredVersionParts[3]);
    const actualVersions = versionExpression.exec(actualVersion);
    const actualMajor = Number(actualVersions[1]);
    const actualMinor = Number(actualVersions[2]);
    const actualPatch = Number(actualVersions[3]);
    if (actualMajor < desiredMajor) {
        return false;
    }
    else if (actualMajor > desiredMajor) {
        return true;
    }
    if (actualMinor < desiredMinor) {
        return false;
    }
    else if (actualMinor > desiredMinor) {
        return true;
    }
    if (actualPatch < desiredPatch) {
        return false;
    }
    else if (actualPatch > desiredPatch) {
        return true;
    }
    return true;
}

function checkVersion(nodeVersion, yarnVersion, npmVersion) {
    const desiredVersions = {
        node: '6.10.0',
        npm: '4.0.3',
        yarn: '0.19.0',
    };

    const errors = {
        noYarn: {
            isProblem: false,
            message: 'You do not have yarn installed. This is a package manager client that installs from the regular npm registry, but ensures you get the same versions of all dependencies required for this repository. It is highly recommended that you install yarn: `npm install --global yarn` (learn more: https://yarnpkg.com/)',
        },
        oldNode: {
            getMessage: (desired, actual) => `Your version of node (${actual}) is older than the recommended version of ${desired}. Please install a more recent version. You can use http://git.io/nvm or https://github.com/coreybutler/nvm-windows to make upgrading your version of node easier.`,
            isProblem: false,
        },
        oldNpm: {
            getMessage: (desired, actual) => `Your version of npm (${actual}) is older than the recommended version of ${desired}. You should install yarn anyway, but if you would rather use npm, please at least have a more recent version. You can install the latest version by running \`npm install --global npm@latest\`.`,
            isProblem: false,
        },
        oldYarn: {
            getMessage: (desired, actual) => `Your version of yarn (${actual}) is older than the recommended version of ${desired}. 'Run \`yarn self-update\` (or \`npm install --global yarn@latest\`) to update.`,
            isProblem: false,
        },
    };

    errors.oldNode.isProblem = !versionIsGreaterOrEqual(desiredVersions.node, nodeVersion);
    errors.oldNode.message = errors.oldNode.getMessage(desiredVersions.node, nodeVersion);

    try {
        errors.oldYarn.isProblem = !versionIsGreaterOrEqual(desiredVersions.yarn, yarnVersion);
        errors.oldYarn.message = errors.oldYarn.getMessage(desiredVersions.yarn, yarnVersion);
    }
    catch (e) {
        errors.noYarn.isProblem = true;
        errors.oldNpm.isProblem = !versionIsGreaterOrEqual(desiredVersions.npm, npmVersion);
        errors.oldNpm.message = errors.oldNpm.getMessage(desiredVersions.npm, npmVersion);
    }
    const systemErrors = Object.keys(errors)
        .filter(key => errors[key].isProblem);

    const errorCount = systemErrors.length;
    if (errorCount === 0) {
        process.exitCode = 0;
        return;
    }

    const errorMessage = systemErrors
        .reduce((message, key) => `${message}\n${errors[key].message}`, '');
    const hasSingleError = errorCount === 1;

    console.error(`There ${hasSingleError ? 'is an issue' : 'are some issues'} with your system. It is quite likely that if you do not resolve these, you will have a hard time running this repository.
${errorMessage}`);
    console.info('If you don\'t care about these warnings, go ahead and install dependencies with `node ./scripts/install`');
    process.exitCode = 1;
}

// Run script
const node = process.version;
let yarn;
let npm;
try {
    yarn = execSync('yarn --version')
        .toString()
        .trim();
}
catch (error) {
}
try {
    npm = execSync('npm --version')
        .toString()
        .trim();
}
catch (error) {
}

checkVersion(node, yarn, npm);

