import { React, useEffect, useState } from 'react';
import { editPosts, deletePosts, searchPosts, getPosts} from '../ActionHandler';
import { applyMiddleware, createStore} from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import Modal from '../Modals';
import './Home.css'

function red (state=[], action) {
  switch(action.type) {
    case "GET": return action.payload
    case "CREATE" : {
        const data = action.payload;
        return([...state , {
            id:data.id, 
            title:data.title, 
            body: data.body}])
    }
    case "EDIT" : {
        const data = state.filter(ele => ele.id != action.payload.id);
        return([...data, {
            id: action.payload.id,
            title: action.payload.title,
            body: action.payload.body,
        }]);
    }
    case "DELETE" : {
        return state.filter(ele => ele.id != action.payload.id);
    }
    case "SEARCH" : {
        return [action.payload];
    }
    
    default: return state
  };
}

export const store = createStore(red, applyMiddleware(thunk));

function capitalize(string) {
    const str = string;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}

function Search() {
    
    const dispatch = useDispatch();

    function searchH(e) {
        e.preventDefault();

        if(e.target.value == '') {
            dispatch(getPosts())
        }
        else {
            dispatch(searchPosts(e.target.value));
        }
    }

    return(
        <div className='search'>
            <strong>Search Posts</strong>
            <input onChange ={searchH} className='search-field' type="field" placeholder='Enter the Post Id...'></input>
        </div>
        
    )
}



function Elements() {
    const arr = useSelector(state => state);
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(true);

    useEffect(()=> {
        dispatch(getPosts());
    }, [])

    function Delete(e) {
        dispatch(deletePosts(e.target.value));
        alert("Post ID: " + e.target.value + " removed!");
    }
    
    function Add(e) {
        setModalIsOpen(!modalIsOpen);
    }

    function Edit(e) {
        const id = e.target.value;
        const post = store.getState()[id-1];
        const defaultTitle = "<Untitled>"
        const defaultBody = "<No Body>";
        let newTitle = prompt("Enter the new title", defaultTitle);
        let newBody = prompt("Enter a body",defaultBody);

        if( newTitle == null || newTitle == "" ) {
            console.log("Title null");
            newTitle = defaultTitle;
        }
        if( newBody == null || newBody == "") {
            console.log("Body null");
            newBody = defaultBody;
        }
        console.log(store.getState()[e.target.value-1]);
        dispatch(editPosts(e.target.value, newTitle, newBody));
        
    }


    const listItems = arr.map((val)=> (
        <li key={val.id} className='post'>
            <button className='post-button2' onClick={Delete} value={val.id}>Delete</button>
            <button className='post-button' onClick={Edit} value={val.id}>Modify</button>
            <div className='post-heading'>
                {capitalize(val.title)}
            </div>

            <div className='post-body'>
                {capitalize(val.body)}
            </div>

            <div className='post-id'>
                ID: {val.id}
            </div>

        </li>
        )
    )
    return( <div>
            {modalIsOpen && <Modal isOpen={Add}/>}
            <ul>{listItems}</ul>
            </div>
            )
}
    
export default function Home() {
    return (
        <Provider store={store}>
            <Search />
            <h2 className='site-heading'>Posts</h2>
            <Elements />
        </Provider>
    )
}
