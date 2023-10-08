import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ControlsProps = typeof __propDef.props;
export type ControlsEvents = typeof __propDef.events;
export type ControlsSlots = typeof __propDef.slots;
export default class Controls extends SvelteComponentTyped<ControlsProps, ControlsEvents, ControlsSlots> {
}
export {};
