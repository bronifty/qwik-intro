import { Signal, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Projector } from "~/routes/me/projector";

export default component$(() => {
  const messageSignal = useSignal("");
  const testBoolSignal = useSignal(false);
  const isMiskoVisibleSignal = useSignal(false);
  const didHeGetABeerSignal = useSignal(false);
  const colorSignal = useSignal("blue");

  useTask$(({ track }) => {
    track(() => didHeGetABeerSignal.value);
    isMiskoVisibleSignal.value = didHeGetABeerSignal.value ? true : false;
  });

  useTask$(({ track }) => {
    track(() => messageSignal.value);
    messageSignal.value === "llama"
      ? (colorSignal.value = "red")
      : (colorSignal.value = "blue");
  });

  return (
    <>
      <BeerGiver gotBeerSignal={didHeGetABeerSignal} />
      <div>
        {isMiskoVisibleSignal.value && (
          <div>
            <h1>Misko</h1>
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Enter message"
        onInput$={(e) => {
          messageSignal.value = (e.target as HTMLInputElement).value;
        }}
      />
      <button
        onClick$={() => {
          testBoolSignal.value = !testBoolSignal.value;
          console.log("testBoolSignal", testBoolSignal.value);
        }}>
        Show projector
      </button>

      {testBoolSignal.value && (
        <Projector message={messageSignal.value} color={colorSignal.value}>
          hi hi{" "}
        </Projector>
      )}
    </>
  );
});

interface BeerGiverProps {
  gotBeerSignal: Signal<boolean>;
}

export const BeerGiver = component$((props: BeerGiverProps) => {
  const { gotBeerSignal } = props;
  return (
    <>
      <button onClick$={() => (gotBeerSignal.value = !gotBeerSignal.value)}>
        Get Beer
      </button>
    </>
  );
});
// export const Misko = component$(({ messageSignal }) => {
//   return (
//     <>
//       <h1>{iptVal.value}</h1>
//     </>
//   );
// });
