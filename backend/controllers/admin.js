db.toggleAccountStatus = async function toggleAccountStatus(req, res, next) {
    try {

        // Recherche du compte par son ID
        const compte = await Compte.findByPk(req.params.id);
        if (!compte) {
            throw new Error('Compte introuvable');
        }

        // Récupération de la valeur isActive dans le corps de la requête
        const isActive = req.body.isActive;
        if (isActive === undefined) {
            throw new Error('l état n est pas défini dans la requete , il manque le paramètre "isactive"');
        }

        // Modification de la valeur estActive du compte
        compte.estActive = isActive;
        await compte.save();

        res.status(201).json(compte.toJSON());
    } catch (error) {
        next(error);
    }
}
//@desc Assign Role To Account  
//@route PUT /api/admin/Compte/:id 
//@access Private 

db.assignRoleToUser = async (req, res, next) => {
    try {

      if (req.roles.indexOf('ADMIN') === -1) {
        const error = new Error("Vous n'êtes pas autorisé à effectuer cette opération.");
        error.status = httpStatus.FORBIDDEN;
        return next(error);
      }
  
      const { idCompte, roles } = req.body;
  
      // Vérifie si le compte existe
      const compte = await Compte.findByPk(idCompte);
      if (!compte) {
        const error = new Error(`Compte avec ID ${idCompte} n'existe pas.`);
        error.status = httpStatus.NOT_FOUND;
        return next(error);
      }
  
      // Vérifie si les rôles existent
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
      if (_roles.length !== roles.split(',').length) {
        const error = new Error('Un ou plusieurs rôles nexistent pas.');
        error.status = httpStatus.NOT_FOUND;
        return next(error);
      }
  
      // Retire tous les rôles de compte
     //   await compte.setRoles([]);
  
      // Affecte les nouveaux rôles au compte
      await compte.setRoles(_roles);
  
      res.status(httpStatus.OK).json(
        {message: `Les rôles ${roles} ont été assignés au compte ${idCompte} avec succès.`}
      );
  
    } catch (error) {
      next(error);
    }
  };