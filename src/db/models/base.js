import { Model, Sequelize } from "sequelize";
import { development } from '../../config/config.json'

const { dialect, storage } = development

export const sequelize = new Sequelize({ dialect, storage });

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(error => {
  console.error('Unable to connect to the database:', error);
})

export default class BaseModel extends Model {
  static init() {
    super.init(this.fields, this.opts)
  }

  static associate() { }

  /**
   * @type {import("sequelize").ModelAttributes}
   */
  static get fields() { return {} }

  /**
   * @type {import("sequelize").InitOptions}
   */
  static get opts() {
    return {
      sequelize,
      underscored: true,
      paranoid: true,
      timestamps: true,
    }
  }
}