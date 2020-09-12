import { InputLabel, TextField } from "@material-ui/core"

import {Dispatch, SetStateAction, useRef} from "react"

import { useState, useEffect, ChangeEvent } from "react";
export interface ArrayProps {
    value: string[],
    name: string,
    labeltext: string,
    onChange: Dispatch<SetStateAction<string[]>>
}

export const ListInput =(props: ArrayProps)=>{
    const [state, setState] = useState(props.value);
    useEffect(() => {
        props.onChange(state);
      }, [state]);
      
      const editState = (e: ChangeEvent<HTMLInputElement>) => {
        
        const tmp = [...state]
        tmp[Number(e.target.id)]=e.target.value
        setState(tmp);
      }
      const addState =() =>{
        const tmp = [...state]
        tmp.push("")
        setState(tmp)
      }
      const removeState = () =>{
        const tmp = [...state]
        console.log(tmp.pop())
        setState(tmp)
      }
    
    return (
        <ul>
            <InputLabel>{props.labeltext}</InputLabel>
            <button type="button" onClick={addState}>
                Add 
            </button>
            <button type="button" onClick={removeState}>
                remove 
            </button>
          {state.map((key, index)=>(
          <li key={index}>
            <input name={props.name} id={index.toString()} type="text" onChange={editState} value={key}/>
          </li>
          ))}
        </ul>
    );
}