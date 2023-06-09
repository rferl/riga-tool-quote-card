import type { Writable } from 'svelte/store';
type SettingsValue = string | number;
type Settings = {
    [key: string]: SettingsValue;
};
export type SettingsWritable = Writable<Settings>;
export {};
