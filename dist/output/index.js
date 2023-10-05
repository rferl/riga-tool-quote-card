"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOutput = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const store_1 = require("svelte/store");
function updateOutput(id, settings, output) {
    const settingsValues = (0, store_1.get)(settings);
    output.update((value) => {
        value.code = `<iframe src="https://nice-bush-008d43c03.3.azurestaticapps.net/?tiid=${id}" width="100%" height="100%" frameborder="0" title="${settingsValues.iframe_title}"></iframe>`;
        value.title = 'Copy embed code';
        value.description = 'Please copy embed code below';
        return value;
    });
}
exports.updateOutput = updateOutput;
