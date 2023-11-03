/*
    Hospitales
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const { hasRol } = require('../middlewares/validate-rol')
const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getWorkshops,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop
} = require('../controllers/workshops')
const { registerUserToWorkshop } = require('../controllers/userWorkshops');

const router = Router();

router.get( '/', getWorkshops );

router.post( '/',
    [
        validateJWT,
        hasRol('ADMIN','EDITOR'),
        check('name','Workshop name is mandatory').not().isEmpty(),
        validateFields
    ], 
    createWorkshop 
);

router.put( '/:id',
    [
        validateJWT,
        hasRol('ADMIN','EDITOR'),
        check('name','Workshop name is mandatory').not().isEmpty(),
        validateFields
    ],
    updateWorkshop
);

router.delete( '/:id',
    validateJWT,
    hasRol('ADMIN','EDITOR'),
    deleteWorkshop
);

router.post('/workshops/:workshopId/register', validateJWT, registerUserToWorkshop);


module.exports = router;