import { writable } from "svelte/store"
import config from '../components/riga-tool.config.js';
import type { SettingsWritable } from "../types/index.d.js";

// Init tool settings with default settings from config file
export const settings: SettingsWritable = writable(config.settings);
