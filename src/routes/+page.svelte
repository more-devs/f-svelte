<script>
	import { onMount } from 'svelte';
	let personas = [];
	let nombre = '';
	let edad = '';
	let editId = null;

	const API = 'https://b2-svelte.onrender.com/personass';

	async function cargarPersonas() {
		const res = await fetch(API);
		personas = await res.json();
	}

	async function agregarOEditarPersona() {
		const persona = { nombre, edad: Number(edad) };

		if (editId) {
			await fetch(`${API}/${editId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(persona)
			});
		} else {
			await fetch(API, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(persona)
			});
		}

		nombre = '';
		edad = '';
		editId = null;
		cargarPersonas();
	}

	async function eliminarPersona(id) {
		await fetch(`${API}/${id}`, { method: 'DELETE' });
		cargarPersonas();
	}

	function cargarParaEditar(persona) {
		nombre = persona.nombre;
		edad = persona.edad;
		editId = persona.id;
	}

	onMount(cargarPersonas);
</script>

<div class="mx-auto max-w-xl p-4">
	<h1 class="mb-4 text-center text-2xl font-bold">CRUD Personas</h1>

	<form on:submit|preventDefault={agregarOEditarPersona} class="space-y-2">
		<input class="w-full rounded border p-2" bind:value={nombre} placeholder="Nombre" required />
		<input
			class="w-full rounded border p-2"
			type="number"
			bind:value={edad}
			placeholder="Edad"
			required
		/>
		<button class="w-full rounded bg-blue-600 px-4 py-2 text-white">
			{editId ? 'Actualizar' : 'Agregar'}
		</button>
	</form>

	<ul class="mt-6 space-y-2">
		{#each personas as persona}
			<li class="flex items-center justify-between rounded border p-3">
				<div>
					<strong>{persona.nombre}</strong> - {persona.edad} años
				</div>
				<div class="space-x-2">
					<button on:click={() => cargarParaEditar(persona)} class="text-yellow-600">✏️</button>
					<button on:click={() => eliminarPersona(persona.id)} class="text-red-600">🗑️</button>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	body {
		font-family: sans-serif;
		background: #f9fafb;
	}
</style>
