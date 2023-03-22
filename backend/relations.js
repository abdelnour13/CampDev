const Utilisateur = require('./models/utilisateur');
const Role = require('./models/role');
const Permission = require('./models/permission');
const Compte = require('./models/compte');
const MembreDeProjet = require('./models/membreDeProjet');
const UtilisateurRole = require('./models/UtilisateurRole');
const RolePermission = require('./models/RolePermission');



Utilisateur.roles = Utilisateur.belongsToMany(Role, {
    through: UtilisateurRole,
    foreignKeyConstraint: true,
    foreignKey: 'idUtilisateur',
    as: 'roles',
});

Role.utilisateurs = Role.belongsToMany(Utilisateur, {
    through: UtilisateurRole,
    foreignKeyConstraint: true,
    foreignKey: 'idRole',
    as: 'utilisateurs',
});

Role.permissions = Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKeyConstraint: true,
    foreignKey: 'idRole',
    as: 'permissions',
});

Permission.roles = Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKeyConstraint: true,
    foreignKey: 'idPermission',
    as: 'roles',
});

Compte.utilisateur = Compte.hasOne(Utilisateur, {
    as: 'utilisateur',
    foreignKey: 'idCompte',
    foreignKeyConstraint: true,
});

Utilisateur.compte = Utilisateur.belongsTo(Compte, {
    as: 'compte',
    foreignKey: 'idCompte',
    foreignKeyConstraint: true,
});

Compte.etudiant = Compte.hasOne(MembreDeProjet, {
    as: 'etudiant',
    foreignKey: 'idCompte',
    foreignKeyConstraint: true,
});

MembreDeProjet.compte = MembreDeProjet.belongsTo(Compte, {
    as: 'compte',
    foreignKey: 'idCompte',
    foreignKeyConstraint: true,
});