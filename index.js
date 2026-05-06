const startup = document.getElementById("startup");
const app = document.getElementById("app");
const input = document.getElementById("PokemonName");
const button = document.getElementById("searchBtn");
const img = document.getElementById("pokeImg");
const meta = document.getElementById("pokemonMeta");
const statsWrap = document.getElementById("statBars");
const explorer = document.getElementById("explorerCards");
const compareSlots = document.getElementById("compareSlots");
const teamSlots = document.getElementById("teamSlots");
const typeAura = document.getElementById("typeAura");

const typeAuraMap = { fire: "rgba(255,98,38,.5)", water: "rgba(66,225,255,.42)", electric: "rgba(253,221,75,.45)", ghost: "rgba(155,98,255,.5)", grass: "rgba(95,255,136,.45)", psychic: "rgba(255,91,197,.45)" };

setTimeout(() => {
  startup.classList.add("hidden");
  app.classList.remove("hidden");
  bootExplorer();
  buildSlots();
}, 2500);

button.addEventListener("click", fetchPoke);
input.addEventListener("keydown", (e) => e.key === "Enter" && fetchPoke());

async function fetchPoke(name = input.value.trim().toLowerCase()) {
  if (!name) return;
  try {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!r.ok) throw new Error();
    const data = await r.json();
    const t1 = data.types[0].type.name;
    img.src = data.sprites.other.home.front_default || data.sprites.front_default;
    meta.innerHTML = `<strong>#${String(data.id).padStart(3, "0")} ${data.name.toUpperCase()}</strong><br/>Type: ${data.types.map((t) => t.type.name).join(" / ")}`;
    typeAura.style.background = `radial-gradient(circle, ${typeAuraMap[t1] || "rgba(255,98,38,.4)"}, transparent 70%)`;
    statsWrap.innerHTML = data.stats.map((s) => `<div class="bar">${s.stat.name}<span class="fill" style="width:${Math.min(s.base_stat, 100)}%"></span></div>`).join("");
    addToCompare(data);
  } catch {
    meta.innerHTML = "Scan failed. Target signature not found.";
  }
}

async function bootExplorer() {
  const ids = [1, 4, 7, 25, 39, 94, 133, 143];
  for (const id of ids) {
    const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const p = await r.json();
    const card = document.createElement("button");
    card.className = "poke-card";
    card.innerHTML = `<img src="${p.sprites.front_default}" alt="${p.name}"/><p>#${p.id} ${p.name}</p>`;
    card.onclick = () => fetchPoke(p.name);
    explorer.appendChild(card);
  }
}

const compare = [];
function addToCompare(data) {
  if (!compare.find((p) => p.id === data.id)) compare.unshift({ id: data.id, name: data.name, atk: data.stats[1].base_stat });
  compare.splice(3);
  compareSlots.innerHTML = compare.map((p, i) => `<div class="slot">${i + 1}. ${p.name.toUpperCase()} // ATK ${p.atk}</div>`).join("") || `<div class="slot">No combat profiles loaded.</div>`;
}

function buildSlots() {
  teamSlots.innerHTML = Array.from({ length: 6 }, (_, i) => `<div class="slot">Capsule ${i + 1}</div>`).join("");
}
