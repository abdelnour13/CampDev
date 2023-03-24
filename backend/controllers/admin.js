const Utilisateur = require('../models/utilisateur');
const Compte = require('../models/compte');
const Role = require('../models/role');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const { Op } = require('sequelize');

const db = {};

db.createAccount = async (req,res,next) => {
    try {

        if(req.roles.indexof('ADMIN') === -1) {
            const error = new Error("vous n'êtes pas autorisé à faire cette opération");
            error.status = httpStatus.FORBIDDEN;
            return next(error);
        }

        const {
            nom,
            prenom,
            dateDeNaissance,
            lieuDeNaissance,
            grade,
            etablissement,
            sexe,
            motDePasse,
            email,
            estActive,
            numeroTelephone,
            roles
        } = req.body;

        const motDePasseCrypté = await bcrypt.hash(motDePasse, 10);

        if(await Compte.findOne({where:{email}}) !== null) {
            const error = new Error('email déja utilusée');
            error.status = httpStatus.CONFLICT;
            return next(error);
        }

        const compte = await Compte.create({
            motDePasse:motDePasseCrypté,
            email:email,
            numeroTelephone:numeroTelephone || null,
            estActive:estActive,
            photo: req.file ? '/pictures/'+req.file.filename : null
        });

        const utilisateur = await Utilisateur.create({
            nom,prénom:prenom,dateDeNaissance,lieuDeNaissance,grade,
            etablissement,sexe,idCompte:compte.get('idCompte')
        });

        const _roles = await Role.findAll({
            where: {
                intitule: {
                    [Op.in]: roles.split(',')
                }
            },
            attributes: {
                include: ['idRole']
            }
        });

        await compte.setRoles(_roles);

        res.status(httpStatus.CREATED).json({
            message: "l'utilisateur a été créé avec succès",
            id:utilisateur.get('id')
        });

    } catch(err) {
        next(err);
    }
}

module.exports = db;