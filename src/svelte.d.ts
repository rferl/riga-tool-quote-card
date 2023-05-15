// Addded as w/o src/lib/index.ts complains about the tx declarations. See issue/discussion here:
//  https://discord.com/channels/457912077277855764/1105739868203663370/1105739868203663370
declare module "*.svelte" {
  import { SvelteComponent } from "svelte";
  export default SvelteComponent;
}