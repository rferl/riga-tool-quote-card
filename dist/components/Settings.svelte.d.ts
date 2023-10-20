import { SvelteComponentTyped } from "svelte";
import type { SettingsWritable, OutputWritable } from '../types/index.d.js';
declare const __propDef: {
    props: {
        settings: SettingsWritable;
        id: string;
        output: OutputWritable;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SettingsProps = typeof __propDef.props;
export type SettingsEvents = typeof __propDef.events;
export type SettingsSlots = typeof __propDef.slots;
export default class Settings extends SvelteComponentTyped<SettingsProps, SettingsEvents, SettingsSlots> {
}
export {};
