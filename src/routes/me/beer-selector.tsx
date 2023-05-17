import { Resource, component$, useResource$ } from "@builder.io/qwik";

export interface Beer {
  name: string;
}

export const BeerSelector = component$(() => {
  // const beers: Beer[] = [{ name: "IPA" }, { name: "Lager" }];
  const beersResource = useResource$<Beer[]>(async () => {
    const res = await fetch("https://api.sampleapis.com/beers/ale");
    const beers = await res.json();
    return beers;
  });
  return (
    <div>
      <Resource
        value={beersResource}
        onPending={() => <div>Loading...</div>}
        onRejected={(reason) => <div>Failed to load beers: {reason}</div>}
        onResolved={(beers) => (
          <select>
            {beers.map((beer, idx) => (
              <option key={idx} value={beer.name}>
                {beer.name}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
});
