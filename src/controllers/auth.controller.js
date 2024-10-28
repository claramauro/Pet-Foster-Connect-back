const authController = {

    register: async (req, res) => {
        /*
       create user with req.query to determine his role
       front fetch '/auth/register?role=${role} where role is "family" or "association'
       connect and authenticate ?
        */
    },

    login: async (req, res) => {
        /*
        connect and authenticated the user
        */
    },

    logout: async (req, res) => {
        /*
       disconnect and unauthenticated the user
         */
    },


};

export { authController };