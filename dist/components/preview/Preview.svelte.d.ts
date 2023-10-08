import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type PreviewProps = typeof __propDef.props;
export type PreviewEvents = typeof __propDef.events;
export type PreviewSlots = typeof __propDef.slots;
export default class Preview extends SvelteComponentTyped<PreviewProps, PreviewEvents, PreviewSlots> {
}
export {};
