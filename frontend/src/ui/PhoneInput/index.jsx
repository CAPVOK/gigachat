import React from "react";
const InputStyle = "py-2 bg-transparent border-2 rounded-xl p-2 px-3 transition border-g focus:duration-150 border-slate-700 focus:border-purple-800 focus:bg-slate-900 text-white placeholder-gray-400 outline-none"
 export const PhoneInput = (props)=>{

    const getInputNumbersValue = function(input){
        return input.value.replace(/\D/g, "");
    }

    const onPhoneInput = function(e){
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formattedInputvalue = "";
        
        if(!inputNumbersValue){
            return input.value = "";
        }

        if([7,8,9].indexOf(inputNumbersValue[0]> -1)){
            if(inputNumbersValue[0]==="9")inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0]==="8")?"8":"+7";
            formattedInputvalue = firstSymbols + " "
            if(inputNumbersValue.length > 1){
                formattedInputvalue += "(" + inputNumbersValue.substring(1,4);
            }
            if(inputNumbersValue.length >=5){
                formattedInputvalue += ") " + inputNumbersValue.substring(4,7);
            }
            if(inputNumbersValue.length >=8){
                formattedInputvalue += "-" + inputNumbersValue.substring(7,9);
            }
            if(inputNumbersValue.length >=10){
                formattedInputvalue += "-" + inputNumbersValue.substring(9,11);
            }
            
        }
        else{
            formattedInputvalue = "+" + inputNumbersValue.substring(0,16);
        }
        input.value = formattedInputvalue;
        
        if (props.onChange) {
            props.onChange(formattedInputvalue);
        }
    }

    return(
        <input className={InputStyle} onChange={onPhoneInput} value={props.value}/>
    );
 }