import Realm from 'realm';

import TagSchema from '../schema/tagSchema';
import UserSchema from '../schema/userSchema';
import TreesSchema from '../schema/treesSchema';

export default function getRealm() {
  return Realm.open({
    schema: [TagSchema, UserSchema, TreesSchema],
  });
}
