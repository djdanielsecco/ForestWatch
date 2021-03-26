export default class TreesSchema {
    static schema = {
      name: 'Trees',
      primaryKey: 'cod_tree',
      properties: {
        cod_tree: { type: 'int', indexed: true },
        name_public: 'string?',
        name_scientific: 'string?',
       
  
      },
    };
  }