import { NativeSelect, NativeSelectProps } from "@material-ui/core"
import React from "react"


export const TitleSelect=(p: NativeSelectProps)=>{
    return (
        <NativeSelect {...p} >
        <option value=""></option>
        <option value="Mr.">Mr.</option>
        <option value="Ms.">Ms.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Dr.">Dr.</option>
        <option value="Professor Emeritus">Professor Emeritus</option>
        <option value="Professor Associate">Professor Associate</option>
        <option value="Professor">Professor</option>
        </NativeSelect>
    )
}