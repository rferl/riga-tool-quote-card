import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string | undefined;
        list?: {
            value: string;
            label: string;
        }[] | undefined;
        settings: any;
        setting: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
export default class Dropdown extends SvelteComponentTyped<DropdownProps, DropdownEvents, DropdownSlots> {
}
export {};
