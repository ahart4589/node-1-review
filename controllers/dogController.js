let dogs = [
    {
        name: 'Charlie',
        bark: 'Loud',
        cute: 'How dare you even ask',
        id: 1
    },
    {
        name: 'Jake',
        bark: 'Annoying',
        cute: false,
        id: 2
    }
]
let id = 3;

module.exports = {
    getDogs: (req, res) => {
        //res is our response object. We use it's methods to send a response back to the requester
        //.status(200) sets a status for the response. Here we set 200 because it's a good request but we could send back whatever we wanted 
        res.status(200).send(dogs)
    }, 

    updateDog: (req, res) => {
        //We use two different things here. 
        //req.params.. req is our request object. It will give us access to 3 different properties. 
        //req.params , req.query and req.body 
        //req.body is the json that we pass in 
        //req.params are all of the parameters on the url e.x /api/:id where :id is a placeholder value for each new request
        //req.query is the optional queries passed to us after /api/dogs?key=value&key2=value2 
        //req.query would look like this {key: 'value', key2: 'value'}
        let {id} = req.params
        let {name, bark, cute} = req.query;
        for(let i = 0; i < dogs.length; i++) {
            if(dogs[i].id === Number(id)) {
                if(name) dogs[i]['name'] = name;
                if(bark) dogs[i]['bark'] = bark;
                if(cute) dogs[i]['cute'] = cute;
            }
        }
        res.status(200).send(dogs)
    }, 
    createDog: (req, res) => {
        //Here we expect the request to have a json body. We expect it to be an object with a name, bark and cute property
        //using destructuring we create new variables.
        //we then add another property name id to our newdog using the id that we have defined in this file 
        let {name, bark, cute} = req.body;
        let newDog = {
            name: name,
            bark: bark,
            cute: cute,
            id: id
        }
        //after adding the id we increment it so that each dog has a unique id
        //This helps us to be able to delete it or update it by passing an id in a request
        id++;
        dogs.push(newDog)
        res.status(200).send(dogs)
    }, 
    deleteDog: (req, res) => {
        //here we pull id of req.params and then loop through our dogs looking for the matching dog.
        //once we find it we splice out of the array and send back the final array to the requester
        let {id} = req.params 
        for(let i = 0; i < dogs.length; i++) {
            if(dogs[i].id == Number(id)) dogs.splice(i, 1)
        }
        res.status(200).send(dogs)
    }
}