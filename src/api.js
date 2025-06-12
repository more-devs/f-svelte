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
