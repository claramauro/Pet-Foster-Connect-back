function generateSlug(name, id) {
  
    const nameSlug = name
      .toLowerCase()                            // Convertir en minuscules
      .trim()                                   // Retirer les espaces en début et fin
      .normalize("NFD")                         // Décomposer les caractères accentués
      .replace(/[\u0300-\u036f]/g, '')           // Enlever les accents
      .replace(/[^a-z0-9\s-]/g, '')             // Enlever les caractères non-alphanumériques
      .replace(/\s+/g, '-')                      // Remplacer les espaces multiples par un tiret
      .replace(/-+/g, '-')                       // Remplacer les tirets multiples par un seul tiret
      .replace(/^-+/, '')                        // Supprimer les tirets en début
      .replace(/-+$/, '');                        // Supprimer les tirets en fin
                        
      return `${nameSlug}-${id}`
  }
  
  export { generateSlug };