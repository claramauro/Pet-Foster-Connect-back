export class notFound extends Error {
    constructor(name, message = "Ressource non trouvée", statusCode = 404) {
        super(message);
        this.name = "Not Found";
        this.statusCode = statusCode;
        // A modifier en prod
        Error.captureStackTrace(this, NotFound);
    }
}

export class validationError extends Error {
    constructor(fieldName, name = "Validation Error") {
        super(name);
        this.message = "Les données fournies sont incorrectes";
        this.fieldName = fieldName; // nom du champ qui a échoué à la validation
        this.statusCode = 400;
        // A modifier en prod
        Error.captureStackTrace(this, ValidationError);
    }
}
