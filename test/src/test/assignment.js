import React, { Fragment } from 'react'
import { useState, useEffect, useRef } from 'react'
import './assignment.css'
import axios from 'axios';

function Search() {
    const [searchInput, setsearchInput] = useState('')
    const [arraydata, setArrayData] = useState([])
    const [suggestion, setSuggestion] = useState(['a'])
    const [searchFocus, setsearchFocus] = useState(false)
    const [dummyArray, setdummyArray] = useState([])

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
    const onsearch = (searchtext) => {
        setsearchInput(searchtext)
    }
    // const onSuggestion = (value) => {
    //     if (suggestion.includes(value)) {
    //         setsearchInput('')
    //         setsearchFocus(false)
    //         return

    //     }
    //     else {
    //         setSuggestion([...suggestion, value])
    //         setsearchInput('')
    //         setsearchFocus(false)
    //     }


    // }
    const filterdata = (e) => {
        const dataobj = arraydata.filter(item => {
            return item.name.toLowerCase().search(
                e.toLowerCase()) !== -1;
            // return item.name.toLowerCase() && item.name

        })
        // setArrayData(dataobj)
        setdummyArray(dataobj)
        console.log(dataobj)
    }

    return (
        <Fragment>
            <div>

                <p style={{ fontSize: '25px', fontWeight: '600' }}>SEARCH DETAILS</p>
                <div className='inputHolder' style={{ display: "flex" }}>
                    <input type="text" onClick={() => { setsearchFocus(true) }} onChange={changeInput} value={searchInput} />
                    {/* <button onClick={() => { onSuggestion(searchInput); filterdata(searchInput) }}  >submit</button> */}
                    <button onClick={() => { filterdata(searchInput) }}  >submit</button>



                    {searchFocus && <div className='suggestionHolder' >
                        {/* {suggestion.length > 0 ? suggestion?.map((val, idx) => {
                            return (
                                <div style={{ cursor: 'pointer' }}>
                                    <p key={idx} onClick={() => { setsearchInput(val); filterdata(val); onSuggestion(searchInput)}}>{val}</p>
                                </div>
                            )
                        })
                            : null
                        } */}
                        {
                            arraydata.filter((da) => {
                                const searchtext = searchInput.toLowerCase()
                                const nameofdata = da.name.toLowerCase();
                                return searchtext && nameofdata.startsWith(searchtext)
                            })

                                .map((val, idx) => {
                                    return (
                                        <div key={idx} onClick={() => { onsearch(val.name); filterdata(searchInput) }}>{val.name}
                                        </div>
                                    )
                                })
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
                    : <p style={{ marginLeft: '46%' }}>no record found</p>}
            </div>



        </Fragment>
    )
}

export default Search
