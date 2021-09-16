
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'UserName' })
      // define association here
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
    title: DataTypes.STRING,
    is_deleted: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Comment'
  })
  return Comment
}
