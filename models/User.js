module.exports = (sequelize , DataTypes) =>{
    const User = sequelize.define("User",{
    //attributes for the project
     id : {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        readOnly: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email',
        validate: {
            isEmail: true
        }
    },
    phone_number: {
        type : DataTypes.STRING,
        allowNull: false
    },
    role: {
        type : DataTypes.STRING,
        allowNull: false
    }
    },
    {
    createdAt: 'account_created',
    updatedAt: 'account_updated'
    
    });
    
    return User;
    };