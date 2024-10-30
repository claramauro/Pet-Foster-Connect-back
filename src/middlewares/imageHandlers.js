import multer from "multer";
import sharp from "sharp";
import path from "node:path";

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
    upload.single("animal_img")(req, res, async (err) => {
        if (err) {
            return next(err); // Passer l'erreur au middleware d'erreur
        }
        if (req.file) {
            let directoryImageName;
            switch (req.file.fieldname) {
                case "animal_img":
                    directoryImageName = "animals";
                    break;
                case "association_img":
                    directoryImageName = "associations";
                    break;
                case "family_img":
                    directoryImageName = "families";
                    break;
                default:
                    break;
            }
            try {
                // On converti l'image en wepb et on l'enregistre dans /public/images
                const originalFileName = path.parse(req.file.originalname).name;
                const imagePath = path.join(
                    import.meta.dirname,
                    `../../public/images/${directoryImageName}/${originalFileName}.webp`
                );
                await sharp(req.file.buffer).webp().toFile(imagePath);
                req.imagePath = imagePath;
            } catch (error) {
                next(error);
            }
            next();
        }
    });
}

export { saveImage };
