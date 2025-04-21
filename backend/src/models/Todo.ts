import { 
    Model, 
    DataTypes, 
    InferAttributes, 
    InferCreationAttributes 
  } from 'sequelize';
  import sequelize from '../config/database';
  
  class Todo extends Model<
    InferAttributes<Todo>, 
    InferCreationAttributes<Todo>
  > {
    declare id?: string;
    declare title: string;
    declare description?: string;
    declare completed?: boolean;
    declare priority?: 'low' | 'medium' | 'high';
  }
  
  Todo.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    }
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'todos',
    timestamps: true
  });
  
  export default Todo;