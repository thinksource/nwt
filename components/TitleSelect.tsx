import { NativeSelect, NativeSelectProps } from "@material-ui/core"
import React from "react"


export const TitleSelect=(p: NativeSelectProps)=>{
    return (
        <NativeSelect {...p} >
        <option value=""></option>
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Miss">Miss</option>
        </NativeSelect>
    )
}