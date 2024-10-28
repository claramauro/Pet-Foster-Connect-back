const associationsController={

    index : async (req,res)=> {
        /*
       fetch and return  res.json() all associations
        */
},
    findOne : async (req,res)=> {
    /*
    fetch with req.params and return res.json() one association
     */
    },

    filter : async (req,res)=> {
        /*
        fetch, filter with req.query and return res.json() all corresponding associations
         */
    }

};

export {associationsController};