import User from '../user'
import chai,{should,} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs';

should();

chai.use(chaiAsPromised);

describe('Testing User API', function(){
    const _fileName = './data-user-test.json';
    let _UserAPI;
    
    before(function(){
        _UserAPI = User(_fileName);
    });

    beforeEach(function(){
        if (fs.existsSync(_fileName)){
            fs.unlinkSync(_fileName);
        }
    });

    after(function(){
        if (fs.existsSync(_fileName)){
            fs.unlinkSync(_fileName);
        }
    });

    it('creating user and login', function(){
        return _UserAPI
            .add({ email: 'my-email', password:'123'})
            .should.be.fulfilled
            .then(() => User(_fileName).login({
                email: 'my-email',
                password: '123',
            }))
    });

    it('try to create twice same user', function(){
        return _UserAPI
            .add({ email: 'my-email', password:'123'})
            .should.be.fulfilled
            .then(_UserAPI.add.bind(_UserAPI,{ email: 'my-email', password:'123'}))
            .should.be.rejectedWith('User alredy exists.');
    });

    it('login with a user that does not exists', function(){
        return _UserAPI
            .login({ email: 'xpto@xtop.com.br', password:'123'})
            .should.be.rejectedWith('User does not exists or invalid password.');
    });

});
