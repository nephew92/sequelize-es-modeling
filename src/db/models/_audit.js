import { ENUM, INTEGER, JSONB, STRING } from "sequelize";
import BaseModel from "./base";
import Site from "./_site";
import User from "./_user";

export default class Audit extends BaseModel {

  static fields = {
    changes: JSONB,
    entityType: STRING,
    entityId: INTEGER,
    action: {
      type: ENUM,
      values: ['create', 'update', 'destroy', 'restore']
    }
  };

  static deletedAt = false;
  static createdAt = true;
  static updatedAt = false;
  static paranoid = false;

  static scopes = {
    entity(entityType) { return { where: { entityType } } },
    action(action) { return { where: { action } } },
    site(siteId) { return { where: { siteId } } },
    user() { return { where: { userId: Audit.getContextUser() } } },
  };

  static hooks = {
    beforeUpdate: () => { throw new Error("This is a read-only history database. You aren't allowed to modify it.") },
    beforeDestroy: () => { throw new Error("This is a read-only history database. You aren't allowed to modify it.") },
  };

  static associate() {
    Audit.belongsTo(User)
    Audit.belongsTo(Site)
  }

  static listens(...Models) {
    for (let Model of Models) {
      Audit.listen(Model)
    }
  }

  static listen(Model) {
    const EntityScope = Audit.scope({ method: ['entity', Model.tableName] })

    EntityScope.belongsTo(Model, {
      as: Model.options.name.singular + 'Entity',
      foreignKey: 'entityId',
      constraints: false,
    })

    Model.hasMany(EntityScope, {
      foreignKey: 'entityId',
      constraints: false,
      as: 'auditLogs',
    })

    Model.addHook('afterCreate', this.addAuditHook(EntityScope, 'create'),)
    Model.addHook('afterUpdate', this.addAuditHook(EntityScope, 'update'),);
    Model.addHook('afterDestroy', this.addAuditHook(EntityScope, 'destroy'),);
    Model.addHook('afterRestore', this.addAuditHook(EntityScope, 'restore'),);
  }

  static addAuditHook(EntityScope, action) {
    const EntityActionScope = EntityScope.scope({ method: ['action', action] })

    return document => { EntityActionScope.createAudit(document) }
  }

  static async createAudit(document) {
    try {
      const userId = this.getContextUser()

      const { id: entityId, siteId } = document
      const { action, entityType } = this.scopeWhere

      await this.create({
        action,
        entityType,
        entityId,
        siteId,
        userId,
        changes: document.getChangedValues(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  static get scopeWhere() {
    return this._scope && this._scope.where || {}
  }

  static getContextUser() {
    // if(session.get('context') !== 'admin')
    // return

    // const user_id = session.get('userId');
    const userId = 1

    if (userId == undefined) {
      throw new Error("User cannot be identified")
    }

    return userId
  }
}