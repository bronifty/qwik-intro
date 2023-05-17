import { Slot, component$ } from "@builder.io/qwik";

export interface ProjectorProps {
  message: string;
  color: string;
}

export const Projector = component$<ProjectorProps>((props) => {
  const { message, color } = props;
  return (
    <>
      <h1>Projector</h1>

      <div style={{ color }}>{message}</div>

      <Slot />
    </>
  );
});
