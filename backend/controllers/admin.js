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