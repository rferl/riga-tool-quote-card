import { writable } from "svelte/store";
import config from '../components/riga-tool.config.js';
// Init tool settings with default settings from config file
export const settings = writable(config.settings);
