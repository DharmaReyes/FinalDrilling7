const {
    users,
    Bootcamps
   } = require('../models')
   const db = require('../models')
   const Bootcamp = db.Bootcamps
   const User = db.users
   
   exports.createBootcamp = (Bootcamp) => {
    return Bootcamp.create({
    title: Bootcamp.title,
    cue: Bootcamp.cue,
    description: Bootcamp.description,
    })
    .then(Bootcamp => {
    console.log(`>> Creado el Bootcamp: ${JSON.stringify(Bootcamp, null, 4)}`)
    return Bootcamp
    })
    .catch(err => {
    console.log(`>> Error al crear el Bootcamp: ${err}`)
    })
   }
   
   exports.addUser = (BootcampId, userId) => {
    return Bootcamp.findByPk(BootcampId)
    .then((Bootcamp) => {
    if (!Bootcamp) {
    console.log("No se encontro el Bootcamp!");
    return null;
    }
    return User.findByPk(userId).then((user) => {
    if (!user) {
    console.log("Usuario no encontrado!");
    return null;
    }
    Bootcamp.addUser(user);
    console.log('***************************')
    console.log(` Agregado el usuario id=${user.id} al Bootcamp con id=${Bootcamp.id}`);
    console.log('***************************')
    return Bootcamp;
    });
    })
    .catch((err) => {
    console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
    });
   };
   
   exports.findById = (Id) => {
    return Bootcamp.findByPk(Id, {
    include: [{
    model: User,
    as: "users",
    attributes: ["id", "firstName", "lastName"],
    through: {
    attributes: [],
    }
    }, ],
    })
    .then(Bootcamp => {
    return Bootcamp
    })
    .catch(err => {
    console.log(`>> Error mientras se encontraba el Bootcamp: ${err}`)
    })
   }
   
   exports.findAll = () => {
    return Bootcamp.findAll({
    include: [{
    model: User,
    as: "users",
    attributes: ["id", "firstName", "lastName"],
    through: {
    attributes: [],
    }
    }, ],
    }).then(Bootcamps => {
    return Bootcamps
    }).catch((err) => {
    console.log(">> Error Buscando los Bootcamps: ", err);
    });
   }