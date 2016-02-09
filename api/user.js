import fs from 'fs';
import crypto from 'crypto';

const _defaultFileName = './data-users.json';
const getHash = (value) => crypto.createHmac('sha256', value).digest('hex');

export default function UserApi(_file = _defaultFileName) {
    return {
        add: function({email,password,}) {
            return new Promise((resolve, reject) => {
                const users = fs.existsSync(_file) ? JSON.parse(fs.readFileSync(_file)) : {};
                if (users[email]) {
                    reject('User alredy exists.')
                }
                
                users[email] = {
                    password: getHash(password),
                };
                fs.writeFileSync(_file, JSON.stringify(users), 'utf8');
                resolve();
            });
        },

        login: function({email,password,}) {
            return new Promise((resolve, reject) => {
                const users = fs.existsSync(_file) ? JSON.parse(fs.readFileSync(_file)) : {};
                if (users[email] && users[email].password == getHash(password) ){
                    return resolve({token: getHash(new Date().toString()) });
                }

                return reject('User does not exists or invalid password.');
            })
        },
    };
}
