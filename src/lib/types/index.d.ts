import type { Writable } from 'svelte/store';

// TODO: this goes to lib (and needs to be added to the Editor)

// Settings
type SettingsValue = string | number | boolean;
type Settings = {
[key: string]: SettingsValue;
};
export type SettingsWritable = Writable<Settings>;

// Output
export type OutputData = {
    code: string;
    title?: string;
    description?: string;
  }
export type OutputWritable = Writable<OutputData>
  
export {};
