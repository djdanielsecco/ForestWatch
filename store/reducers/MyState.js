let initialState = {
  TagNumber: '',
  TagLat: null,
  TagLon: null,
  TagAlt: null,
  TagAcc: null,

};

const MyState = (state = initialState, action) => {
  switch (action.type) {
    case 'Update': {

      //state.TagNumber = action.TagNumber
      return { TagNumber: action.TagNumber }

    }
    case 'Location': {

      //state.TagNumber = action.TagNumber
      return {
        TagLat: action.TagLat,
        TagLon: action.TagLon,
        TagAlt: action.TagAlt,
        TagAcc: action.TagAcc,
      }

    }

    default: { return state }
  }




}


export default MyState