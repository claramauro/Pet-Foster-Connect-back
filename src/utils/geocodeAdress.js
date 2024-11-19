import { ValidationError } from "./customErrors.js";

/**
 * Fonction pour géocoder une adresse via Nominatim.
 *
 * @param {string} address - Numéro (facultatif) et nom de rue
 * @param {string} zipcode - code postal
 * @param {string} city - Nom de la ville
 * @returns {Promise<{latitude: number, longitude: number}>} - Latitude et Longitude de l'adresse géocodée.
 */
const geocodeAddress = async (address, zipcode, city) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${address}, ${zipcode}, ${city}`)}&addressdetails=1&limit=1`;

    try {
        // Envoi de la requête avec un User-Agent pour éviter les blocages
        const response = await fetch(url, {
            headers: {
                "User-Agent": "MonApp/1.0 (contact@monapp.com)", // Remplace par l'email ou contact de ton app
            },
        });

        const data = await response.json(); //

        // Afficher les données récupérées

        if (!response.ok) {
            // Si la réponse n'est pas ok (status 4xx ou 5xx), on lève une erreur
            const errorMessage = `Erreur ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        if (data && data.length > 0) {
            // Extraction des coordonnées depuis la réponse JSON
            const { lat, lon } = data[0];
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        } else {
            // Si aucune donnée n'est retournée, on lance une erreur
            throw new ValidationError("adresse", "Aucun résultat trouvé pour cette adresse.");
        }
    } catch (error) {
        // Gestion des erreurs avec plus de détails
        console.error("Erreur dans le géocodage:", error);
        throw error;
    }
};

export { geocodeAddress };
