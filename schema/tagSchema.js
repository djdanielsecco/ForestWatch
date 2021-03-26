export default class TagSchema {
  static schema = {
    name: 'Tag',
    primaryKey: 'number',
    properties: {
      number: { type: 'int', indexed: true },
      cod_tree: 'int?',
      cod_allotment: 'int?',
      cod_zone: 'int?',
      cod_owner: 'int?',
      position: 'string?',
      geo_latitude: 'string?',
      geo_longitude: 'string?',
      geo_location: 'string?',
      dibble: 'bool?',
      active: 'bool?',
      images: 'data?[]',
      altura_muda: 'string?',
      owner: 'string?',
      selfie: 'bool?',
      active_at: 'date?',
      dibble_at: 'date?'

    },
  };
}






// CarSchema = {
//   name: 'Imagens',
//   properties: {
//     number: { type: 'int', indexed: true },
//     images: 'data?[]',
//     geo_location: 'string?',
//   }
// };
