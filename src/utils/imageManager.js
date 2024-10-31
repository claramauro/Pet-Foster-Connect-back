import fs from "node:fs/promises";

/**
 * @param {String} path the path of the image to delete
 */
async function removeImage(path) {
    await fs.unlink(path);
}

export { removeImage };
