import { Typography, TextField, Switch, NativeSelect, InputLabel, } from "@material-ui/core"
import {  useFormik } from "formik"
// import {Theme, makeStyles, createStyles} from "@material-ui/core"
import fetcher from "../../libs/fetcher"
import React, { useState } from "react"

import { decodeAuthCookie } from "../../libs/auth"
import { getDatabaseConnection } from "../../libs/db"
import { Organization } from "../../src/entity/Organization"
import { Contact } from "../../src/entity/Contact"
import { IncomingMessage, ServerResponse } from "http"
import { Socket } from "net"
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "@material-ui/lab"
import  { useRouter } from 'next/router';
import { useUser } from "../../components/UserProvider"
import { Technology } from "../../src/entity/Technology"
import { NextPageContext } from "next"
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     textField: {
//       marginLeft: theme.spacing(1),
//       marginRight: theme.spacing(1),
//       width: 200,
//     },
//   }),
// );


class IProject{
    id: string
    name : string
    brief : string
    link: string
    organizationId: string
    COVID_19: boolean
    contactId: string
    createbyId:string
    constructor(){
        this.id = uuidv4()
        this.name=''
        this.brief=''
        this.link=''
        this.COVID_19=false
        this.organizationId = ''
        this.contactId = ""
        this.createbyId=""       
    }
}

interface IContact{
    id: string,
    title: string,
    first_name:string,
    last_name: string,
    job_title:string,
    email:string,
    country:string,
    state: string
  }
interface Props{
    technology: IProject,
    org_name: string,
    org_website: string,
    org_member: boolean,
    contacts: IContact[]
}

const ProjectForm = (p: Props)=>{

    var init=p.technology
    console.log(init)
    const router = useRouter()
    const contactlist = p.contacts
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    // const classes = useStyles();
    const user = useUser();

    const handleDeleteProject = async ()=>{
        const t ={id: p.technology.id, createbyId: user.id}
        const myfetch = fetcher('delete', JSON.stringify(t))
        const result = await myfetch('../api/technology/delete')
        if(result.status === 200){
            setMessage("Already Delete project")
            setError("success")
            router.push("/project/manage")
        }else{
            const m =await result.json();
            setMessage(m)
            setError("error")
        }
    }
    const formik = useFormik({

        initialValues: init,
   
        onSubmit: async (values )=> {
            const t= Object.assign(values)
            console.log(t)
            const myfetch =fetcher('post',JSON.stringify(t))
            const result= await myfetch('/api/technology/update')
    
            if(result.status ===200){
              setMessage("Update successful")
              setError("success")
            }
   
        },
   
      });
    console.log(formik.values)
    return (
        <>
        <Typography variant="h3">Technology information</Typography>
        {message?<Alert severity={error}>{message}</Alert>:<br />}
        <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>
        <InputLabel>Technology Name:</InputLabel>
        <TextField name="name" label="technology name" value={formik.values.name} onChange={formik.handleChange}></TextField><br/>
        <InputLabel>Brief Introduction:</InputLabel><br/>
        <TextField name="brief" value={formik.values.brief} label="introduction project" onChange={formik.handleChange} multiline rows={4}
            fullWidth={true} variant="outlined"/>
            <br />
            <InputLabel>Technology demo or detail link:</InputLabel>
            <TextField name="link" label="website link" value={formik.values.link} onChange={formik.handleChange}></TextField>
            <InputLabel>COVID 19:</InputLabel><Switch onChange={formik.handleChange} color="primary" name="COVID_19" value={formik.values.COVID_19}/> <br />
            <label><strong>Organization:</strong></label><label>{p.org_name}</label> &#9;<label><strong>organization website:</strong></label><label>{p.org_website}</label> <br />
            <label><strong>Member of AAAiH:</strong></label><label>{p.org_member? "Yes": "NO"}</label><br/>

            <InputLabel></InputLabel>
            <Typography variant="h6">Contact select:</Typography>
            <NativeSelect name ="contactId" value={formik.values.contactId} onChange={formik.handleChange}>
                <option value=""></option>
                {contactlist.map((row, _index, _rows)=>{
                    return (<option value={row.id} key= {row.id}>{`${row.first_name} ${row.last_name} ${row.email}`}</option>)
                })}
            </NativeSelect>
            <br/>
            <button type="submit"> Submit</button>
            <button onClick={handleDeleteProject}> Delete</button>
        </form>
        </>
    )
}

export default ProjectForm

export const getServerSideProps = async (ctx: NextPageContext) => {
    const cookiestr=ctx.req?.headers.cookie?ctx.req?.headers.cookie:''
    const inc = new IncomingMessage(new Socket())
    const res = ctx.res?ctx.res: new ServerResponse(ctx.req?ctx.req:inc)
    try{
    console.log("=========update technology================")
    console.log(cookiestr)
    const token = decodeAuthCookie(cookiestr)
    const db = await getDatabaseConnection()
    const orep = db.getRepository<Organization>('organization')
    const build = orep.createQueryBuilder().innerJoin('person', 'Person', 'Person.belongOrganizationId = Organization.id')
        .where("Person.userId = :id", {id: token.UserId})
    const oresult = await build.getOne()
    const crep = db.getRepository<Contact>('contact')
    const cbuild = crep.createQueryBuilder().where("createbyId = :id", {id: token.UserId})
    const cresult = await cbuild.getMany()
    const technologyId = ctx.query?ctx.query.technologyId:''
    var re: Technology
    if(technologyId){
        const t = await db.getRepository<Technology>('technology').findOne({where: {id: technologyId}})
        re =t?t: new Technology(token.UserId)
    }else{
        re = new Technology(token.UserId)
    }
    re.organizationId = oresult?oresult.id:''
    re.createbyId = token.UserId
    console.log(re)
    return {
        "props":{
            "technology": JSON.parse(JSON.stringify(re)),
            "org_name": oresult?oresult.name:"",
            "org_website": oresult?oresult.website:"",
            "org_member": oresult? oresult.member: false,
            "contacts": cresult? cresult.map(c=>c.toJSON()):[]
        }
    }
    }catch(e){
        res.writeHead(301, {Location:'/login'})
        return {
            "props":{

            }
        }
    }


}