const dashboardController = {

    getAnimals: async (req, res) => {
        /*
       fetch and return res.json() all animals
        */
    },

    storeAnimal: async (req, res) => {
        /*
        create and store animal return res.json() new animal
        */
    },

    updateAnimal: async (req, res) => {
        /*
        update animal with req.params return res.json updated animal
         */
    },

    destroyAnimal: async (req, res) => {
        /*
        delete animal with req.params return "ok"
         */
    },

    getProfile: async (req, res) => {
        /*
       fetch and return res.json() association profile
        */
    },

    updateProfile: async (req, res) => {
        /*
        update association profile return res.json updated profile
         */
    },

    destroyProfile: async (req, res) => {
        /*
        delete association profile return "ok"
         */
    },

    getRequests: async (req, res) => {
        /*
       fetch and return res.json() all requests
        */
    },

    updateRequest: async (req, res) => {
        /*
        update request with req.params return res.json updated request
         */
    },

};

export { dashboardController };