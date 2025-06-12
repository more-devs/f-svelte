/* src/api.js */
const BASE_URL = "https://b-svelte.onrender.com/"; // reemplaza cuando tengas el backend listo

export async function obtenerPersonas() {
    const res = await fetch(`${BASE_URL}/personas`);
    return await res.json();
}

export async function crearPersona(persona) {
    const res = await fetch(`${BASE_URL}/personas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persona)
    });
    return await res.json();
}

export async function actualizarPersona(id, persona) {
    const res = await fetch(`${BASE_URL}/personas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persona)
    });
    return await res.json();
}

export async function eliminarPersona(id) {
    await fetch(`${BASE_URL}/personas/${id}`, {
        method: "DELETE"
    });
}


/*src/App.svelte*/

<script>
	import { onMount } from 'svelte';
	import { obtenerPersonas, crearPersona, actualizarPersona, eliminarPersona } from './api.js';

	let personas = [];
	let nombre = '';
	let edad = '';
	let editando = null;

	onMount(async () => {
		personas = await obtenerPersonas();
	});

	async function guardar() {
		if (editando) {
			await actualizarPersona(editando.id, { nombre, edad });
			editando = null;
		} else {
			await crearPersona({ nombre, edad });
		}
		nombre = '';
		edad = '';
		personas = await obtenerPersonas();
	}

	function editar(persona) {
		nombre = persona.nombre;
		edad = persona.edad;
		editando = persona;
	}

	async function eliminar(id) {
		await eliminarPersona(id);
		personas = await obtenerPersonas();
	}
</script>

<h1>Personas</h1>

<form on:submit|preventDefault={guardar}>
	<input bind:value={nombre} placeholder="Nombre" required />
	<input type="number" bind:value={edad} placeholder="Edad" required />
	<button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
</form>

<ul>
	{#each personas as persona}
		<li>
			{persona.nombre} ({persona.edad} años)
			<button on:click={() => editar(persona)}>Editar</button>
			<button on:click={() => eliminar(persona.id)}>Eliminar</button>
		</li>
	{/each}
</ul>

