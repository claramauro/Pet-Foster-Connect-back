const animalsController = {

    index: async (req, res) => {
        /*
       fetch and return  res.json() all animals
        */
    },
    findOne: async (req, res) => {
        /*
        fetch with req.params and return res.json() one association
         */
    },

    createRequest: async (req, res) => {
        /*
        create request with association_id (user_id) family_id (user_id) and animal_id return res.json() request
         */
    },

    filter: async (req, res) => {
        /*
        fetch, filter with req.query and return res.json() all corresponding animals
         */
    },

};

export { animalsController };