import React, { Fragment } from 'react'
import { useState, useEffect, useRef } from 'react'
import './assignment.css'
import axios from 'axios';

function Search() {
    const [searchInput, setsearchInput] = useState('')
    const [arraydata, setArrayData] = useState([])
    const [suggestion, setSuggestion] = useState(['a'])
    // const InputRef=useRef()
    const [searchFocus, setsearchFocus] = useState(false)
    const [dummyArray,setdummyArray]=useState([])

    const fetchingDAta = () => {
        // axios('https://drive.google.com/file/d/1mxkyTLHqg28DvprxXWsnzppu1dAAD-89/view?usp=sharing')
        axios('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                console.log(res.data)
                setArrayData(res.data)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchingDAta()
    }, [])


    const changeInput = (e) => {
        setsearchInput(e.target.value);
    }
    const onSuggestion = (value) => {
        if (suggestion.includes(value)) {
            setsearchInput('')
            setsearchFocus(false)
            return  
           
        }
        else {
            setSuggestion([...suggestion, value])
            setsearchInput('')
            setsearchFocus(false)
        }
      

    }
    const filterdata=(e)=>{
const dataobj=arraydata.filter(item=>{
    return item.name.toLowerCase().search(
    e.toLowerCase()) !== -1;})
// setArrayData(dataobj)
setdummyArray(dataobj)
console.log(e)
    }

    //    console.log(InputRef.current.focus()) 

    return (
        <Fragment>
            <div>

                <p>search</p>
                <div className='inputHolder' style={{ display: "flex" }}>

                    <input type="text" onClick={() => { setsearchFocus(true) }} onChange={changeInput} value={searchInput} />

                    <button onClick={() => { onSuggestion(searchInput);filterdata(searchInput)}}  >submit</button>
                    {searchFocus && <div className='suggestionHolder' >
                        {suggestion.length > 0 ? suggestion?.map((val, idx) => {
                            return (
                                <p key={idx} onClick={() => { setsearchInput(val) }}>{val}</p>
                            )
                        })
                            : null
                        }
                    </div>}


                </div>
            </div>

            <div className='parent-details'>
                {dummyArray?.length > 0 ? dummyArray?.map((item, index) => {
                    return (
                        <div key={index} className='details'> 
                            <p>{item.name}</p>
                            <p>{item.username}</p>
                            <p>{item.company.name}</p>

                        </div>
                    )
                })
                    : <p>search something</p>}
            </div>



        </Fragment>
    )
}

export default Search
