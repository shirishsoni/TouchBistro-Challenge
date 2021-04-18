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
                max : value
            })
        }).then(res => res.json()).then(result => {
            alert(result.median);
        });
        
        alert("Submitted");
    }

    return (
        <>
            {
                state.isValid?null: "Enter a valid Value."
            }
            <input type="text" value={state.value} onChange={handleChange} />
            <button disabled={!state.isValid} onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Input