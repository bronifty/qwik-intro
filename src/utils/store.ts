import type { Signal } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
export const beerContextId = createContextId<Signal<boolean>>("beerContextId");
