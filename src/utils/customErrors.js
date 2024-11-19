export class NotFoundError extends Error {
    constructor(message = "Ressource non trouvée", statusCode = 404) {
        super(message);
        this.name = "Not Found";
        this.statusCode = statusCode;
        // A modifier en prod
        Error.captureStackTrace(this, NotFoundError);
    }
}

export class ValidationError extends Error {
    constructor(fieldName, message, name = "Validation Error") {
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

export class AuthentificationError extends Error {
    constructor(message = "Email ou mot de passe incorrect.") {
        super("Authentification Error");
        this.message = message;
        this.statusCode = 401;
        // À modifier en production
        Error.captureStackTrace(this, AuthentificationError);
    }
}

export class AuthorizationError extends Error {
    constructor(message = "Accès refusé.") {
        super("Authorization Error");
        this.message = message;
        this.statusCode = 403;
        // A modifier en prod
        Error.captureStackTrace(this, AuthorizationError);
    }
}
