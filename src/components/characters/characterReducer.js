const INITIAL_STATE = {
    name: '',
    limits: [ {value: 20, label: 20}, {value: 40, label: 40}, {value: 60, label: 60}, {value: 100, label: 100}],
    orderBy:[
        {value: "name", label: "Name ASC."},
        {value: "modified", label: "Modificado ASC."},
        {value: "-name", label: "Name DESC"},
        {value: "-modified", label: "Modificado DESC."}
    ]
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case 'CHANGE':
            return {...state, title: action.payload};
        default:
            return state;
    }
}