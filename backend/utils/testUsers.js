import bcrypt from 'bcrypt';

export const saltRounds = 10;
const hashedPwAdmin = bcrypt.hashSync("password1", saltRounds);
const hashedPwUser = bcrypt.hashSync("password2", saltRounds);

export const testUsers = [
    {
        id: 1,
        email: 'admin@test.com',
        password: hashedPwAdmin,
        role: "admin",
        mfaSecret:null
    },
    {
        id: 2,
        email: 'user@test.com',
        password: hashedPwUser,
        role: "user",
        mfaSecret:null
    }
]