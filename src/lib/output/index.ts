/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "svelte/store";

function updateOutput(id: string, settings: any, output: any) {
  const settingsValues: any = get(settings);

  output.update((value: any) => {
    value.code = `<iframe src="https://my.hosted.webapp/?tiid=${id}" width="100%" height="100%" frameborder="0" title="${settingsValues.iframe_title}"></iframe>`;

    value.title = 'Copy embed code';
    value.description = 'Please copy embed code below';

    return value;
  });
}

export { updateOutput }