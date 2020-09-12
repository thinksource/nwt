import { Typography, TextField, NativeSelect, Button, Grid, Switch, InputLabel} from "@material-ui/core"
import { useState, ChangeEvent } from "react";
import {ListInput} from "../../components/ListInput"
import Alert from '@material-ui/lab/Alert';

import { useUser } from "../../components/UserProvider";
import { NextPageContext } from "next";
import { getDatabaseConnection } from "../../libs/db";
import { Organization } from "../../src/entity/Organization";
import _ from 'lodash';
interface IOrgz{
    name: string,
    id: string,
    brief: string,
    status: string,
    website: string,
    mailext: string[],
    member: number
}
type Props ={
    item?: IOrgz
}
const OrgzForm = ({item}: Props)=>{

    const [name, setName] = useState<string>(item?item.name:"");
    const [brief, setBrief] = useState<string>(item?item.brief:"");
    const [ostatus, setOstatus] = useState<string>(item?item.status:"");
    const [website, setWebsite] = useState<string>(item?item.website:"");
    const [message, setMessage] = useState<string>()
    const user= useUser()
    const [mailext, setMailExt] = useState<string[]>(item?item.mailext:[""]);
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    const [member, setMember] = useState<number>(item?item.member:0)
    const handleChangeStatus =(e: ChangeEvent<HTMLSelectElement>)=>{
        setOstatus(e.currentTarget.value)
    }
    console.log("member=",member)
    const handleSubmit=()=>{
        const val = {creatby: user.id, name, brief, ostatus, website, mailext}
        console.log(val)
        fetch('/api/org/update', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(val)
      }).then(async (res)=>{
        if (res.ok){
            setError("success")
            setMessage("update successfull")
            console.log(message)
        }else{
            setError("error")
            const myjson = await res.text()
            setMessage(myjson)
        }
      })
    }

    const websiteChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setWebsite(e.target.value)
    }
    const nameChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value)
    }
    function briefChange(e:ChangeEvent<HTMLInputElement>){
      setBrief(e.target.value)
    }
    
    function memberChange(e:ChangeEvent<HTMLInputElement>){
      setMember(Number(e.target.checked))
    }
    return (
        <>
          <Typography variant="h3">Oraganization information</Typography>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '50vh' }}
              >
            <Grid item xs={12}>
            {message?
            <Alert severity={error}>{message}</Alert>:""}           
            </Grid>
            <Grid item xs={8}>
            <Typography variant="body1" component="p">Oragnization Name:</Typography>
            <TextField value={name} label="Oragnization name" variant="outlined" onChange={nameChange}/>
            </Grid>
            <Typography variant="body1" component="p">Oragnization Brief Introduction:</Typography>
            <TextField value={brief} label="Brief introduction" multiline rows={4} variant="outlined" fullWidth={true} onChange={briefChange}/>
            <Typography variant="body1" component="p">Oragnization status: </Typography><NativeSelect value={ostatus}
               onChange={handleChangeStatus}>
              <option value="inactive">inactive</option>
              <option value="active">active</option>
              <option value="deleted">deleted</option>
           </NativeSelect><br/>

           <TextField value={website} label="Oragnization website" variant="outlined" onChange={websiteChange}/><br/>
           <InputLabel>Be member of AAAiH:</InputLabel><Switch color="primary" name="COVID_19" checked={member?true:false} onChange={memberChange}/><br/>
           <Typography variant="body1" component="p">Mail extension: </Typography>
           <ListInput value={mailext} onChange={setMailExt} labeltext="input mail extesion" name="mailext"/>
           <Button  variant="contained" color="primary" onClick={handleSubmit}> Submit</Button>
           </Grid>
        </>
    )
}
export default OrgzForm
export async function getServerSideProps(cxt: NextPageContext) {
    const id = cxt.query.id
    const db= await getDatabaseConnection()
    const dbrep = db.getRepository<Organization>('organization')
    const result = await dbrep.findOne({where: {id}})
    console.log(result)
    const json = result? result.toJSON():{}
    console.log(json)
    _.each(json, v=>console.log(typeof v, v))
    return {
      props: {item: json}, // will be passed to the page component as props
    }
  }