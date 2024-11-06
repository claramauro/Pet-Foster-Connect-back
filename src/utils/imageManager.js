import fs from "node:fs/promises";
import path from "node:path";

/**
 * @param {String} path the path of the image to delete
 */
async function removeImage(path) {
    await fs.unlink(path);
}

/**
 * @param {String} relativePath the relative path of the image (/images/...)
 * @returns {String} the absolute path of the image (/src/public/images/...)
 */
function getAbsolutePathOfImage(relativePath) {
    return path.join(import.meta.dirname, "../../public", relativePath);
}

/**
 * @param {String} absolutePath the absolute path of the image (/src/public/images/...)
 * @returns {String} the relative path of the image (/images/...)
 */
function getRelativePathOfImage(absolutePath) {
    return absolutePath.replace("/src/public", "");
}

export { removeImage, getAbsolutePathOfImage, getRelativePathOfImage };
