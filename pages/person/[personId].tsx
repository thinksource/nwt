import {  Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core"
import { NextPageContext } from "next"
import React from "react"
import { getDatabaseConnection } from "../../libs/db"
import { flaten } from "../../libs/utils"
import { Person } from "../../src/entity/Person"

interface Props{
    person: Person
}
const PersonInform=(props: Props)=>{
    const person=props.person
    // const router = useRouter()
    const handleGo = ()=>{
        window.history.back()
    }
    return (<>
        <Typography variant="subtitle1">
        Personal information
        </Typography>
        <TableContainer  classes={{root: 'itemtable'}}>
        <Table aria-label="simple table">
            <TableBody>
            <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>{person.title}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>First Name:</TableCell>
            <TableCell>{person.first_name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Last Name:</TableCell>
            <TableCell>{person.last_name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>CVOID_19 experience:</TableCell>
            <TableCell>{person.COVID_19?"Yes":"No"}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Expertise:</TableCell>
            <TableCell>{person.expertise?person.expertise.toString():""}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Belong Organization:</TableCell>
            <TableCell>{person.belong_organization.name}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Introduction:</TableCell>
            <TableCell>{person.introduction}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell>Linked Account:</TableCell>
            <TableCell>{person.user.email}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
        <Button onClick={handleGo} variant="contained" color="primary">Go back</Button>
        </TableContainer>
        </>

    )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    const personId = ctx.query?ctx.query.personId?.toString():""
    const db = await getDatabaseConnection()
    const prep = db.getRepository<Person>('person')
    const result = await prep.findOne({where:{id: personId},relations: ['user','belong_organization']})
    if(result){
        console.log(result?.toJSON())
        return {props:{person: flaten(result)}}
    }else{
        return {props: {person: {}}}
    }
}
export default PersonInform