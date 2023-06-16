import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SettingsWrapProps = typeof __propDef.props;
export type SettingsWrapEvents = typeof __propDef.events;
export type SettingsWrapSlots = typeof __propDef.slots;
export default class SettingsWrap extends SvelteComponentTyped<SettingsWrapProps, SettingsWrapEvents, SettingsWrapSlots> {
}
export {};
