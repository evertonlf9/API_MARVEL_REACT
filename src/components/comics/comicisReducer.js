const INITIAL_STATE = {
    title: '',
    name: '',
    limits: [ {value: 20, label: 20}, {value: 40, label: 40}, {value: 60, label: 60}, {value: 100, label: 100}],
    orderBy:[
        {value: "title", label: "Titulo ASC."},
        {value: "modified", label: "Modificado ASC."},
        {value: "issueNumber", label: "Numero da edição ASC."},
        {value: "onSaleDate", label: "Data da venda ASC."},
        {value: "-title", label: "Titulo DESC"},
        {value: "-modified", label: "Modificado DESC."},
        {value: "-issueNumber", label: "Numero da edição DESC."},
        {value: "-onSaleDate", label: "Data da venda DESC."}
    ]
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case 'CHANGE':
            return {...state, title: action.payload}
        default:
            return state;
    }
}