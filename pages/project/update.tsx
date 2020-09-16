import { Typography, TextField, Switch,  NativeSelect, InputLabel, Theme, makeStyles, createStyles} from "@material-ui/core"
import {  useFormik } from "formik"
import { Project } from "../../src/entity/Project"
import fetcher from "../../libs/fetcher"
import React, { useState } from "react"

import { NextPageContext } from "next"
// import { decodeAuthCookie } from "../../libs/auth"
import { getDatabaseConnection } from "../../libs/db"
import { Organization } from "../../src/entity/Organization"


import { IncomingMessage, ServerResponse } from "http"
import { Socket } from "net"
import { ListInput } from "../../components/ListInput"
import { v4 as uuidv4 } from 'uuid';
import { Alert } from "@material-ui/lab"
import  { useRouter } from 'next/router';
import { Contact } from "../../src/entity/Contact"
import { decodeAuthCookie } from "../../libs/user"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);


class IProject{
    id: string
    name : string
    brief : string
    expertise : string[]
    organizationId: string
    COVID_19: boolean
    start: string
    end: string
    contactId: string
    createbyId:string
    constructor(){
        const today = new Date()
        this.id = uuidv4()
        this.name=''
        this.brief=''
        this.expertise = [] as string[]
        this.COVID_19=false
        this.organizationId = ''
        this.start = today.toJSON().substr(0, 10)
        this.end = today.toJSON().substr(0, 10)
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
    project: IProject,
    org_name: string,
    org_website: string,
    org_member: boolean,
    contacts: IContact[]
}

const ProjectForm = (p: Props)=>{

    var init=p.project
    const router = useRouter()
    const contactlist = p.contacts
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    const [expertis, setExpertis] = useState(p.project.expertise)
    const classes = useStyles();

    const handleDeleteProject = async ()=>{
        const t ={projectId: p.project.id}
        const myfetch = fetcher('delete', JSON.stringify(t))
        const result = await myfetch('../api/project/delete')
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
            const t= Object.assign(values, {expertise: expertis})
            console.log(t)
            const myfetch =fetcher('post',JSON.stringify(t))
            const result= await myfetch('/api/project/update')
    
            if(result.status ===200){
              setMessage("Update successful")
              setError("success")
            }
   
        },
   
      });
    console.log(formik.values)
    return (
        <>
        <Typography variant="h3">Project information</Typography>
        {message?<Alert severity={error}>{message}</Alert>:<br />}
        <form onSubmit={(e)=>{e.preventDefault(); formik.handleSubmit()}}>
        <InputLabel>Project Name:</InputLabel>
        <TextField name="name" label="project name" value={formik.values.name} onChange={formik.handleChange}></TextField><br/>
        <InputLabel>Brief Introduction:</InputLabel><br/>
        <TextField name="brief" value={formik.values.brief} label="introduction project" onChange={formik.handleChange} multiline rows={4}
            fullWidth={true} variant="outlined"/>
            <br />
        <InputLabel>add expertis requirement fields:</InputLabel>
        <ListInput labeltext="the expertis fields" name="expertis" value={expertis} onChange={setExpertis} />
            <InputLabel>COVID 19:</InputLabel><Switch onChange={formik.handleChange} color="primary" name="COVID_19" value={formik.values.COVID_19}/> <br />
            <label><strong>Organization:</strong></label><label>{p.org_name}</label> &#9;<label><strong>organization website:</strong></label><label>{p.org_website}</label> <br />
            <label><strong>Member of AAAiH:</strong></label><label>{p.org_member? "Yes": "NO"}</label><br/>
            <Typography variant="h6">Project Period:</Typography>
            <InputLabel>Start from:</InputLabel>
            <TextField
                id="statedate"
                name="start"
                label="start date"
                type="date"
                value={formik.values.start}
                className={classes.textField}
                onChange ={formik.handleChange}
                InputLabelProps={{
                shrink: true,
                }}
            /><br />
            <InputLabel>End by:</InputLabel>
            <TextField
                id="enddate"
                name="end"
                label="end date"
                type="date"
                value={formik.values.end}
                onChange ={formik.handleChange}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
            /><br />
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
    console.log("========project update=============")
    console.log(cookiestr)
    const user = decodeAuthCookie(cookiestr)
    const db = await getDatabaseConnection()
    const orep = db.getRepository<Organization>('organization')
    const build = orep.createQueryBuilder().innerJoin('person', 'Person', 'Person.belongOrganizationId = Organization.id')
        .where("Person.userId = :id", {id: user.id})
    const oresult = await build.getOne()
    const crep = db.getRepository<Contact>('contact')
    const cbuild = crep.createQueryBuilder().where("createbyId = :id", {id: user.id})
    const cresult = await cbuild.getMany()
    const projectId = ctx.query?ctx.query.projectId:''
    var re: Project| IProject
    if(projectId){
        const t = await db.getRepository<Project>('project').findOne({where: {id: projectId}})
        re =t?t: new IProject()
    }else{
        re = new IProject()
    }
    re.organizationId = oresult?oresult.id:''
    re.createbyId = user.id
    console.log(re)
    return {
        "props":{
            "project": JSON.parse(JSON.stringify(re)),
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