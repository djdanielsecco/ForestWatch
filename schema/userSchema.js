export default class UserSchema {
  
  static schema = {
    name: 'User',
    primaryKey: 'cod_user',
    properties: {
      cod_user: { type: 'int', indexed: true },
      cod_company: 'int?',
      csrf_token: 'string?',
      user_token: 'string?',
      firstname: 'string?',
      lastname: 'string?',
      email: 'string?',
      telephone: 'string?' ,
      active: 'bool?',
      manager: 'bool?',
      type: 'int?',
      admin: 'string?',
      company: 'string?',
      slug: 'string?',
      password:'string?',

    },
  };
}


