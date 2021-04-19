import React, { useState } from "react";

function Input(){

    const [state, setState] = useState({
        value : "",
        isValid : true
    });
    
    function handleChange(e){
        let value = e.target.value || "";
        let isValid = true;
        let regex = /^\d+$/;
        
        if (!regex.test(value)){
            isValid = false;
        }

        setState({
            value , isValid
        })
    }

    function handleSubmit(e){
        fetch("http://localhost:4000/primeNumbers/",{
            "method" : "post",
            "headers" : {
                'Content-Type' : "application/json",
            },
            "body" : JSON.stringify({
                max : state.value
            })
        })
        .then(res => res.json())
        .then(result => {
            alert(result.median);
        });
    }

    return (
        <>
            {
                state.isValid ? null: <span>Enter a valid value.</span>
            }
            <input placeholder='Enter value' type="text" value={state.value} onChange={handleChange} />
            <button disabled={!state.isValid} onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Input