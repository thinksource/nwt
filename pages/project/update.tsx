import { Typography, TextField, Switch, FormControlLabel, NativeSelect, InputLabel, Input, Theme, makeStyles, createStyles} from "@material-ui/core"
import {  useFormik } from "formik"
import {global} from "../../libs/global"
import { Project } from "../../src/entity/Project"
import fetcher from "../../libs/fetcher"
import React, { ChangeEvent, useState } from "react"
import { ArrayInput } from "../../components/ArrayInput"
import { CompareArrowsOutlined, SentimentSatisfied } from "@material-ui/icons"
import { NextApiResponse, NextPageContext } from "next"
import { decodeAuthCookie } from "../../libs/auth"
import { getDatabaseConnection } from "../../libs/db"
import { Organization } from "../../src/entity/Organization"
import { loadGetInitialProps } from "next/dist/next-server/lib/utils"
import { Contact } from "../../src/entity/Contact"
import { useUser } from "../../components/UserProvider"
import { IncomingMessage, ServerResponse } from "http"
import { Socket } from "net"
import { ListInput } from "../../components/ListInput"
import { v4 as uuidv4 } from 'uuid';
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
    organization: string
    COVID_19: boolean
    start: string
    end: string
    createby: string
    contact: string
    constructor(){
        const today = new Date()
        this.id = uuidv4()
        this.name=''
        this.brief=''
        this.expertise = [] as string[]
        this.COVID_19=false
        this.organization = ''
        this.start = today.toJSON().substr(0, 10)
        this.end = today.toJSON().substr(0, 10)
        this.createby = ""
        this.contact = ""       
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
    const contactlist = p.contacts
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    const [COVID19, setCOVID19] = useState(p.project.COVID_19)
    const [expertis, setExpertis] = useState(p.project.expertise)
    const [contact, setContact] = useState(p.project.contact)
    const user = useUser()
    const classes = useStyles();

    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        setCOVID19(e.target.checked)
    }
    const formik = useFormik({

        initialValues: init,
   
        onSubmit: async (values )=> {
            const t= Object.assign(values, {createby: user.id}, {expertise: expertis})
            console.log(t)
            const myfetch =fetcher('post', new Headers(), JSON.stringify(t))
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
            <NativeSelect name ="contact" value={formik.values.contact} onChange={formik.handleChange}>
                <option value=""></option>
                {contactlist.map((row, _index, _rows)=>{
                    return (<option value={row.id} key= {row.id}>{`${row.first_name} ${row.last_name} ${row.email}`}</option>)
                })}
            </NativeSelect>
            <br/>
            <button type="submit"> Submit</button>
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
    const token = decodeAuthCookie(cookiestr)
    const db = await getDatabaseConnection()
    const orep = db.getRepository<Organization>('organization')
    const build = orep.createQueryBuilder().innerJoin('person', 'Person', 'Person.belong_organization = Organization.id')
        .where("Person.userId = :id", {id: token.UserId})
    const oresult = await build.getOne()
    const crep = db.getRepository<Contact>('contact')
    const cbuild = crep.createQueryBuilder().innerJoin('person', 'Person', 'Person.id=Contact.personId')
        .where("Person.userId = :id", {id: token.UserId})
    const cresult = await cbuild.getMany()
    const re = new IProject()
    re.organization = oresult?oresult.id:''
    re.createby = token.UserId
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