export class NotFoundError extends Error {
    constructor(name, message = "Ressource non trouvée", statusCode = 404) {
        super(message);
        this.name = "Not Found";
        this.statusCode = statusCode;
        // A modifier en prod
        Error.captureStackTrace(this, NotFoundError);
    }
}

export class ValidationError extends Error {
    constructor(
        fieldName,
        message = "Les données fournies sont incorrectes",
        name = "Validation Error"
    ) {
        super(name);
        this.message = message;
        this.fieldName = fieldName; // nom du champ qui a échoué à la validation
        this.statusCode = 400;
        // A modifier en prod
        Error.captureStackTrace(this, ValidationError);
    }
}

export class ServerError extends Error {
    constructor(
        error,
        name = "Server Error",
        message = "Une erreur est survenue. Veuillez réessayer plus tard.",
        statusCode = 500
    ) {
        super(message);
        this.error = error; // récupérer les infos sur l'erreur
        this.name = name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, ServerError);
    }
}
