// import type { Signal } from "@builder.io/qwik";
import { useContext, useContextProvider } from "@builder.io/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Projector } from "~/routes/me/projector";
import { beerContextId, projectorContextId } from "~/utils/store";

export default component$(() => {
  const messageSignal = useSignal("");
  const colorSignal = useSignal("blue");
  const testBoolSignal = useSignal(false);
  const isMiskoVisibleSignal = useSignal(false);
  const didHeGetABeerSignal = useSignal(false);
  // useContext
  // useContextProvider

  useContextProvider(beerContextId, didHeGetABeerSignal);
  useContextProvider(projectorContextId, {
    messageSignal,
    colorSignal,
  });
  // useContextProvider(messageContextId, messageSignal);
  // useContextProvider(colorContextId, colorSignal);

  useTask$(({ track }) => {
    track(() => didHeGetABeerSignal.value);
    isMiskoVisibleSignal.value = didHeGetABeerSignal.value ? true : false;
  });

  useTask$(({ track }) => {
    track(() => messageSignal.value);
    messageSignal.value.indexOf("llama") !== -1
      ? (colorSignal.value = "red")
      : (colorSignal.value = "blue");
  });

  return (
    <>
      <BeerGiver />
      {/* <BeerGiver gotBeerSignal={didHeGetABeerSignal} /> */}
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

      {testBoolSignal.value && <Projector>hi hi </Projector>}
    </>
  );
});

// interface BeerGiverProps {
//   gotBeerSignal: Signal<boolean>;
// }

export const BeerGiver = component$(() => {
  // const { gotBeerSignal } = props;
  const gotBeerSignal = useContext(beerContextId);
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
