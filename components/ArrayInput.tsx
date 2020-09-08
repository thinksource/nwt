import { TextField } from "@material-ui/core"

import {Dispatch, SetStateAction} from "react"

import { useState, useEffect, ChangeEvent } from "react";
export interface ArrayProps {
    inputfields: string[],
    labeltext: string,
    setInputFields: Dispatch<SetStateAction<string[]>>
}


export const ArrayInput =(props: ArrayProps)=>{

    var [fields, setFields]=useState<string[]>(props.inputfields);

    const addfields=()=>{
        const tmp = [...fields]
        tmp.push("")
        setFields(tmp)
        props.setInputFields(tmp)
    }
    const removefields=()=>{
        const tmp = [...fields]
        tmp.pop()
        setFields(tmp)
        props.setInputFields(tmp)
    }
    useEffect(()=>{
        rendinglist()
    }, [fields])
    
    const chnageInput=(index:number, value:string)=>{
        const tmp= [...fields]
        tmp[index]=value;
        setFields(tmp)
        props.setInputFields(tmp)
    }
    // const txtInput=(e: ChangeEvent<>)=>{

    // }
    const rendinglist=()=>{
        return fields.map(key=>(<li><TextField value={key} label="mail extension"></TextField></li>))
    }
    return (
    <ul>
        <p><button type="button" onClick={addfields}>
            Add 
        </button>
        <button type="button" onClick={removefields}>
            remove 
        </button></p>
        {fields.map((key, index)=>(<li><TextField label={props.labeltext} color="secondary" value={key} key={index} onChange={(val: ChangeEvent<HTMLInputElement>)=>{
            chnageInput(index, val.target.value)
            
        }}/></li>))}
    </ul>)
}

