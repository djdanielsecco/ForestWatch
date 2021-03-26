'use strict';
import Realm from 'realm';
import api from './api';
import getRealm from "./realm"
import { Buffer } from 'buffer'
import { useNavigation } from '@react-navigation/native';
let app = getRealm()
let realm
realm = new Realm({ path: 'default.realm' })
let user_details = realm.objects('User')
let trees_details = realm.objects('Trees')
let tags_details = realm.objects('Tag')

const Fw = {
    Db: realm,
    user_details: user_details,
    trees_details: trees_details,
    tags_details: tags_details,
  
    getUser() {
        let n = this.user_details[0]
        return n
    },
    getTrees() {
        return this.trees_details
    },
    async signIn(email, password) {
       
        let d = this.Db
   let register =  async (resData, email, password)=> {
            let user_data = {
                email,
                password,
                cod_user: resData.user.cod_user,
                cod_company: resData.user.cod_company,
                csrf_token: resData.csrf,
                user_token: resData.user.user_token,
                firstname: resData.user.firstname,
                lastname: resData.user.lastname,
                telephone: resData.user.telephone,
                active: resData.user.active === 1,
                manager: resData.user.manager === 1,
                type: resData.user.type,
                admin: String(resData.user.admin),
                company: resData.user.company,
                slug: resData.user.slug,
            }
   d.write(() => {
                d.create('User', user_data, 'modified');
                console.log('User regitred');
           
            })
           return true
        }
  return  api.post('/api/authenticate', {
            email,
            password
        })
            .then(async function (response) {
                console.log('comp..', response.data.user.cod_company);
               
            return await register(response.data, email, password)
            })
            .catch(function (error) {
                console.log('oi')
                console.log(error);
               
            });
      
    },
    signOut() {
        const { email, password ,cod_user} = this.getUser()
        api.get('/api/authenticate', {
            email,
            password
        })
            .then(async function (response) {
                console.log(response.data.user);
                realm.write(() => {
                   // User[0].csrf_token = '';
                    realm.create('User', {cod_user: cod_user, csrf_token:null}, 'modified');
                  });
                  
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    async isLogIn() {
        const { email, password } = this.getUser()
      
      
        return  await this.signIn(email, password)

    },
  async  registerTag(data) {
       
        let d = this.Db
    d.write(() => {
            d.create('Tag', data, 'modified');
            console.log('Tag regitred');
           
          
        });
        return true
    },
    tag_model() {
        let model = {
            number: 0,
            cod_tree: null,
            cod_allotment: null,
            cod_zone: null,
            cod_owner: null,
            position: '',
            geo_latitude: '',
            geo_longitude: '',
            geo_location: '',
            dibble: false,
            active: false,
            images: [],
            altura_muda: null,
            owner: null,
            selfie: null,
            active_at: null,
            dibble_at: null
        }
        return model
    },
    async initTrees() {
        let d = this.Db
        let csrf_token = this.user_details[0].csrf_token;
        try {
            api.defaults.headers.common['csrf_token'] = csrf_token;
           
            const response = await api.get(`/app/offline/trees?light=true`).then(function (response) {
                for (const res in response.data) {
                    console.log(response.data[res].cod_tree + "   <>  " + response.data[res].name_public + "   <>  " + response.data[res].name_scientific);
                    let data = {
                        cod_tree: response.data[res].cod_tree,
                        name_public: response.data[res].name_public,
                        name_scientific: response.data[res].name_scientific
                    }
                    d.write(() => {
                        d.create('Trees', data, 'modified');
                    });
                }
            });
        } catch (err) {
            console.log('Error get Trees');
        }
    },
    async postSync(num) {
        let d = this.Db
        let user_token = this.user_details[0].user_token;
        let nnn = this.tags_details.filtered('number ==' + num)
        let bbb = nnn[0].images
        const realmData = []
        for (let i in bbb){
       realmData.push(Buffer.from(bbb[i]).toString('base64'))
          console.log('Upload Image n >  ', i)
        }
        let tag = nnn[0]
        try {
            api.defaults.headers.common['user_token'] = user_token;
       //     Axios.defaults.headers.common['user_token'] = user_token
            const response = await api.post(`app/offline/sync`,{
                number: num,
                cod_tree: nnn[0].cod_tree,
                cod_allotment: nnn[0].cod_allotment,
                cod_zone: nnn[0].cod_zone,
                cod_owner: nnn[0].cod_owner,
                position: nnn[0].position,
                geo_latitude: nnn[0].geo_latitude,
                geo_longitude: nnn[0].geo_longitude,
                dibble: nnn[0].dibble,
                active: nnn[0].active,
                images: realmData,
                altura_muda: nnn[0].altura_muda,
                owner: nnn[0].owner,
                selfie: nnn[0].selfie,
                active_at: nnn[0].active_at,
                dibble_at: nnn[0].dibble_at


            }).then(async function (res) {
             console.log('Status resp......>>>>>:   ', res.status);
                // for (const res in response) {
                //     console.log(res);
                //   }
                return res
            })
           // console.log('Status resp:   ', response);
           return response
        } catch (err) {
            console.log('Error Sync');
        }
    }
}
export default Fw
