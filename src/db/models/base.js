import { Model, Sequelize } from "sequelize";
import { development } from '../../config/config.json'

const { dialect, storage } = development

export const sequelize = new class extends Sequelize {
  constructor() {
    super({ dialect, storage })

    this.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch(error => {
      console.error('Unable to connect to the database:', error);
    })
  }

  initModels(...Models) {
    for (let Model of Models) {
      Model.init()
    }

    for (let Model of Models) {
      Model.associate()
    }
  }
}

export default class BaseModel extends Model {
  getChangedValues() {
    return [...this._changed].reduce((changes, field) => {
      changes[field] = this[field]
      return changes
    }, {})
  }

  static init() {
    const { fields, sequelize, scopes, hooks, timestamps, paranoid, underscored, modelName, createdAt, deletedAt, updatedAt, tableName } = this
    super.init(fields, { sequelize, scopes, hooks, timestamps, paranoid, underscored, modelName, createdAt, deletedAt, updatedAt, tableName })
  }

  static associate() { }

  static scope(...options) {
    if (this._scopeOptions) {
      options = [].concat(this._scopeOptions, options)
    }
    return class extends super.scope(options) {
      static _scopeOptions = options;
    }
  }

  /**
   * @type {import("sequelize").ModelAttributes}
   */
  static fields = {};

  /**
   * @type {Sequelize}
   */
  static sequelize = sequelize;

  /**
   * @type {import("sequelize").ModelScopeOptions}
   */
  static scopes;

  /**
   * @type {import("sequelize/types/hooks").ModelHooks}
  */
  static hooks;

  /**
   * @type {boolean}
   */
  static timestamps = true;

  /**
   * @type {boolean}
   */
  static paranoid = true;

  /**
   * @type {boolean}
   */
  static underscored = true;

  /**
   * @type {string | boolean}
   */
  static createdAt;

  /**
   * @type {string | boolean}
   */
  static deletedAt;

  /**
   * @type {string | boolean}
   */
  static updatedAt;

  /**
   * @type {string}
   */
  static get modelName() { return this.name.toLowerCase() }

  /**
   * @type {string}
   */
  static tableName;
}