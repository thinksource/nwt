import { Typography, TextField, NativeSelect, Button, Grid} from "@material-ui/core"
import { useState, ChangeEvent } from "react";
import {ArrayInput, ArrayProps} from "../../components/ArrayInput"
import Alert from '@material-ui/lab/Alert';

import { useUser } from "../../components/UserProvider";
import { NextPageContext } from "next";
import { getDatabaseConnection } from "../../libs/db";
import { Organization } from "../../src/entity/Organization";

interface IOrgz{
    name: string,
    id: string,
    brief: string,
    status: string,
    website: string,
    mailext: string[],
}
type Props ={
    item?: IOrgz
}
const OrgzForm = ({item}: Props)=>{
    console.log(item)
    const [name, setName] = useState<string>(item?item.name:"");
    const [brief, setBrief] = useState<string>(item?item.brief:"");
    const [ostatus, setOstatus] = useState<string>(item?item.status:"");
    const [website, setWebsite] = useState<string>(item?item.website:"");
    const [message, setMessage] = useState<string>()
    const user= useUser()
    const [mailext, setMailExt] = useState<string[]>(item?item.mailext:[""]);
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    const handleChangeStatus =(e: ChangeEvent<HTMLSelectElement>)=>{
        setOstatus(e.currentTarget.value)
    }
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
           <Typography variant="body1" component="p">Mail extension: </Typography>
           <ArrayInput inputfields={mailext} setInputFields={setMailExt} labeltext="input mail extesion"/>
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

    const json = result? result.toJSON():{}
    return {
      props: {item: json}, // will be passed to the page component as props
    }
  }