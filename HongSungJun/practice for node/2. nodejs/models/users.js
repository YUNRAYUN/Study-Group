import {Model} from 'sequelize'

export function qqq(sequelize,DataTypes){
    class User extends Model{
        static associate(models){

        }
    }

    User.init({
        userId: {
            primaryKey : true,
            type: DataTypes.INTEGER
        },
        email: DataTypes.STRING,
        nickname: DataTypes.STRING,
        password: DataTypes.STRING
    
        
    },{
        sequelize,
        modelName: 'User'
    })
    return User
}
