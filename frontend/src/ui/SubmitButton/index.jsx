import React, { useEffect } from "react";
import { getHi } from "../../core/api";

export const SubmitButton = ({callback, label, color} ) => {

    return(
        <div>
            <button type="submit" className=" bg-slate-200" onClick={() => getHi().then(res => alert(res)).catch(e => console.log(e))}>Show me</button>
        </div>
    );
}