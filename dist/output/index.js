/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "svelte/store";
function updateOutput(id, settings, output) {
    const settingsValues = get(settings);
    output.update((value) => {
        value.code = `<iframe src="https://nice-bush-008d43c03.3.azurestaticapps.net/?tiid=${id}" width="100%" height="100%" frameborder="0" title="${settingsValues.iframe_title}"></iframe>`;
        value.title = 'Copy embed code';
        value.description = 'Please copy embed code below';
        return value;
    });
}
export { updateOutput };
