import { pokemonEntries } from '../../data/pokemon';
import PokemonCard from '../../components/cards/PokemonCard';

export default function ExplorerPage() {
  return (
    <section className="rounded-panel border border-ember-700/40 bg-ember-950/45 p-6 shadow-holo sm:p-8">
      <header className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-[0.08em] text-zinc-100">Explorer Grid</h1>
          <p className="mt-1 text-sm text-zinc-300">Collectible holo scan cards · hover to inspect</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pokemonEntries.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
}
