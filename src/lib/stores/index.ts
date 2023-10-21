import { writable } from "svelte/store"
import config from '../components/riga-tool.config.js';
import type { SettingsWritable } from "../types/index.d.ts";

// Dynamic preview panel dimensions
export const previewWidth = writable(0);
export const previewHeight = writable(0);

// Init tool settings with default settings from config file
export const settings: SettingsWritable = writable(config.settings);
export const settingsEncoded = writable('');
