import fs from "node:fs/promises";
import path from "node:path";

/**
 * @param {String} path the path of the image to delete
 */
async function removeImage(path) {
    await fs.unlink(path);
}

/**
 * Rename the image with the name passed on argument and a timestamp
 * @param {String} oldPath the path of the image to rename
 * @param {String} newName must be a string without extension
 * @return {String} newImagePath
 */
async function renameImage(oldPath, newName) {
    const timestamp = Date.now();
    // Ajoute un timestamp pour gérer les versions de l'image pour la mise en cache
    const newImagePath = path.join(oldPath, "../", `${newName}-${timestamp}.webp`);
    console.log(newImagePath);

    await fs.rename(oldPath, newImagePath);
    return newImagePath;
}

export { removeImage, renameImage };
