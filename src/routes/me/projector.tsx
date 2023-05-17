import { Slot, component$, useContext } from "@builder.io/qwik";
import {
  colorContextId,
  messageContextId,
  projectorContextId,
} from "~/utils/store";

// export interface ProjectorProps {
//   message: string;
//   color: string;
// }

export const Projector = component$(() => {
  // const { message, color } = props;
  // const message = useContext(messageContextId);
  // const color = useContext(colorContextId);
  const { messageSignal: message, colorSignal: color } =
    useContext(projectorContextId);
  return (
    <>
      <h1>Projector</h1>
      <div>
        {/* <div style={{ color.value }}>
        Outside span just do demo using style with double and single braces{" "}
        {"  "} */}
        <span style={"color:" + color.value}>{message.value}</span>
      </div>

      <Slot />
    </>
  );
});
