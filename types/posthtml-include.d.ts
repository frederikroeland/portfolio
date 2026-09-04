declare module 'posthtml-include' {
  import type { Plugin } from 'posthtml';

  interface IncludeOptions {
    root?: string;
    encoding?: string;
  }

  export default function include(options?: IncludeOptions): Plugin;
}
