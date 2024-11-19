import multer from "multer";
import sharp from "sharp";
import path from "node:path";

// L'image n'est pas enregistré mais stocké en mémoire
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Liste des types MIME autorisés
        const allowedTypes = /jpeg|jpg|png|webp/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extensionName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extensionName) {
            return cb(null, true); // Fichier accepté
        } else {
            return cb(
                new Error(
                    "Type de fichier non autorisé, veuillez télécharger une image au format JPEG, PNG ou WebP."
                ),
                false
            ); // Fichier rejeté
        }
    },
});

function convertAndSaveImage(req, res, next) {
    upload.fields([
        { name: "animal_img", maxCount: 1 },
        { name: "association_img", maxCount: 1 },
        { name: "family_img", maxCount: 1 },
    ])(req, res, async (err) => {
        if (err) {
            return next(err); // Passer l'erreur au middleware d'erreur
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return next();
        }
        if (req.files) {
            const possibleFields = ["animal_img", "association_img", "family_img"];
            const currentField = possibleFields.find((field) => req.files[field] !== undefined);
            const directoryMapping = {
                animal_img: "animals",
                association_img: "associations",
                family_img: "families",
            };
            const directoryImageName = directoryMapping[currentField];
            try {
                // On converti l'image en wepb et on l'enregistre dans /public/images
                const originalFileName = path.parse(req.files[currentField][0].originalname).name;
                const imagePath = path.join(
                    import.meta.dirname,
                    `../../public/images/${directoryImageName}/${originalFileName}-${Date.now()}.webp`
                );
                // Voir pour redimensionner l'image ?
                await sharp(req.files[currentField][0].buffer)
                    .resize(1000, null, { fit: "cover" })
                    .webp()
                    .toFile(imagePath);
                req.absolutePathImage = imagePath;
            } catch (error) {
                next(error);
            }
            next();
        }
    });
}

export { convertAndSaveImage };
