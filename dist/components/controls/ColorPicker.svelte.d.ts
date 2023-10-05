import { SvelteComponentTyped } from "svelte";
import type { SettingsWritable } from '../../types/index.d.js';
declare const __propDef: {
    props: {
        label?: string | undefined;
        settings: SettingsWritable;
        setting: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ColorPickerProps = typeof __propDef.props;
export type ColorPickerEvents = typeof __propDef.events;
export type ColorPickerSlots = typeof __propDef.slots;
export default class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}
export {};
