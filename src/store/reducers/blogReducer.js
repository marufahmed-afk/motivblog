

const initState = {
    blogs:[
        {id: '1', title: 'live strong', content: 'hahahahahahah'},
        {id: '2', title: 'fight strong', content: 'lol'},
        {id: '3', title: 'score points', content: 'rofl'}

    ]
}

const blogReducer = (state = initState, action) => {
    switch (action.type){
        case 'CREATE_BLOG':
            console.log('created blog', action.blog);
            return state;
        case 'CREATE_BLOG_ERROR':
            console.log('create blog error', action.err);
            return state;
        case 'ADD_LIKE_SUCCESS':
            console.log('liked something maybe');
            return state;
        case 'ADD_LIKE_ERROR':
            console.log('dont know! a like error', action.err);
            return state;
        default:
            return state;
    }
}

export default blogReducer