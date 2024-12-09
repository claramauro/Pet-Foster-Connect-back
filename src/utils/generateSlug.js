/**
 * @param {String} name
 * @param {Number|String} id
 * @returns {String} slug
 */
function generateSlug(name, id) {
    if (!name || !id) {
        throw new Error(`${!name ? "Le nom" : "L'id"} ne peut pas être vide.`);
    }
    if (typeof name !== "string") {
        throw new Error("Le nom doit être de type string.");
    }
    if (typeof id !== "string" && typeof id !== "number") {
        throw new Error("L'id doit être de type string ou number.");
    }
    const nameSlug = name
        .toLowerCase() // Convertir en minuscules
        .trim() // Retirer les espaces en début et fin
        .normalize("NFD") // Décomposer les caractères accentués
        .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
        .replace(/[^a-z0-9\s-]/g, "") // Enlever les caractères non-alphanumériques
        .replace(/\s+/g, "-") // Remplacer les espaces multiples par un tiret
        .replace(/-+/g, "-") // Remplacer les tirets multiples par un seul tiret
        .replace(/^-+/, "") // Supprimer les tirets en début
        .replace(/-+$/, ""); // Supprimer les tirets en fin

    return `${nameSlug}-${id}`;
}

export { generateSlug };
