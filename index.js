async function fetchPoke() {
    try {
        const pokename = document
            .getElementById("PokemonName")
            .value
            .toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);

        if (!response.ok) {
            throw new Error("Pokemon not found");
        }

        const data = await response.json();

        document.getElementById("pokeImg").src = data.sprites.other["home"].front_default;
        document.getElementById("pokeImg").style.display = `block`;
        const img = document.getElementById("pokeImg");
        img.onload = () => img.classList.add("loaded");

        console.log(data);
    } catch (error) {
        console.error(error);
        alert("Pokemon not found!");
    }
}
