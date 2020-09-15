import React, { useState, ChangeEvent, useEffect } from 'react';
import { Typography, Grid,  TextField, FormControlLabel, Switch, NativeSelect, makeStyles, Theme, createStyles, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, InputLabel } from '@material-ui/core';
import { Formik, Form, Field, FormikHelpers} from 'formik'
import { NextPageContext} from 'next';
import { getDatabaseConnection } from '../../libs/db';
import Alert from '@material-ui/lab/Alert';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import { Person } from '../../src/entity/Person';
import { Organization } from '../../src/entity/Organization';
import fetcher from '../../libs/fetcher'
import { Contact } from '../../src/entity/Contact';
import { TitleSelect } from '../../components/TitleSelect';
import { useUser } from '../../components/UserProvider';
import { ListInput } from '../../components/ListInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    centalign: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);


export interface OrganizationProps{
    id: string,
    name: string,
    website: string,
}
export interface PeopleProps {
    names: string[];
}
interface Props {
  organzations: Array<OrganizationProps>
  person: Person,
  userId: string
}

interface IContact{
  title: string,
  first_name:string,
  last_name: string,
  job_title:string,
  email:string,
  country:string,
  state: string
}


const PersonForm = (p : Props)=>{

    const classes = useStyles();
    const [title, setTitle] = useState<string>(p.person.title?p.person.title:"");
    const [firstname, setFirstname] = useState<string>(p.person.first_name);
    const [lastname, setLastname] = useState<string>(p.person.last_name);
    const [clinical_exp, setClinicalExp] = useState<string[]>(p.person.expertise?p.person.expertise:[]);
    const [COVID19, setCOVID19] = useState<Boolean>(p.person.COVID_19);
    const [belongOrg, setbelongOrg] = useState<OrganizationProps>(p.person.belong_organization?p.person.belong_organization: new Organization().generate());
    const [introduction, setIntroduction] = useState<string>(p.person.introduction)
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([] as IContact[]);
    const user = useUser()
    var ncontact = new Contact()

    useEffect(()=>{
      console.log(`/api/contact/${p.userId}`)
      const myfetch = fetcher('get')
      myfetch(`/api/contact/${p.userId}`).then(async res=>{
        if(res.ok){
            const result = (await res.json()) as IContact[]
            setRows(await result)
            console.log("++++get data++++")
            console.log(rows)
        }
      })
    }, [open])

    const ChangeOrg = (_e: ChangeEvent<{}>, value: OrganizationProps|null, _reason: AutocompleteChangeReason)=>{
      const index=_.findIndex(p.organzations, (nv)=>nv.id === value?.id)
      setbelongOrg(p.organzations[index])
  }


    
    const handleCOVID19 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCOVID19(event.target.checked)
    }
    
    const handleChangeTitle =(e: ChangeEvent<HTMLSelectElement>)=>{
      setTitle(e.target.value)
    }
    const ChangeFirstName =(e:ChangeEvent<HTMLInputElement>)=>{
      setFirstname(e.target.value)
    }
    const ChangeLastName =(e:ChangeEvent<HTMLInputElement>)=>{
      setLastname(e.target.value)
    }
    const handleChangeIntroduction= (e:ChangeEvent<HTMLInputElement>)=>{
      setIntroduction(e.target.value)
    }

    const handleClose =()=>{
      setOpen(false)
    }

    const handleOpen =()=>{
      setOpen(true)
    }

    const handleAddContact= async (values: Contact, _formikHelpers: FormikHelpers<Contact>)=>{
      const t= Object.assign(values, {createbyId: user.id})
      console.log(t)
      const myfetch =fetcher('post', JSON.stringify(t))
      const result= await myfetch('/api/contact/update')
      if(result.status ===200){
        setMessage("Update successful")
        setError("success")
      }
      handleClose()
    }

    const HandleSubmit=async ()=>{
       var val = {title, firstname, lastname, COVID19, belong_org:belongOrg.id, 
              userId: p.person.user,
              expertise: clinical_exp,
              id: p.person.id,
              introduction
              }
      console.log(JSON.stringify(val))
      const myfetch =fetcher('post', JSON.stringify(val))
      const result = await myfetch('/api/person/update')
      if(result.ok){
        setError("success")
        setMessage("successful update")
      }

    }
    return (
      <div className={classes.root}>
            <Typography variant="h3">
            Personal information
            </Typography>

                <Grid container spacing={3}>
    <Grid item xs={12}>{message?<Alert severity={error}>{message}</Alert>:""}</Grid>
                    <Grid item xs={2}>
                    <NativeSelect value={title} className={classes.centalign}
                        onChange={handleChangeTitle}>
                        <option value=""></option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Miss">Miss</option>
                    </NativeSelect>
                      
                    </Grid>
                    <Grid item xs={5}>
                    <TextField label="Frist Name" value={firstname} onChange={ChangeFirstName}></TextField>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField label="Last Name" value={lastname} onChange={ChangeLastName}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-static"
                    label="Summary of healthcare experience"
                    value= {introduction}
                    onChange ={handleChangeIntroduction}
                    multiline
                    rows={4}
                    fullWidth={true}
                    placeholder="free text; 350 characters with spaces"
                    variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControlLabel
                    label="Clinical expertise"
                    control={
                      <ListInput value={clinical_exp} name="exps" onChange={setClinicalExp} labeltext="keywords of experience"></ListInput>
                    }
                    
                    />
                    <FormControlLabel
                    label="COVID-19 experience"
                    control={
                    <Switch
                        checked={COVID19?true:false}
                        onChange={handleCOVID19}
                        name="checkedB"
                        color="secondary"
                    />
                    }
                    ></FormControlLabel>

                    </Grid>

                    <br/>
                    <Grid item xs={9}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={p.organzations}
                        onChange ={ChangeOrg}
                        value = {belongOrg}
                        inputValue = {belongOrg.name}
                        getOptionLabel={(option: OrganizationProps) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params:any) => <TextField {...params} label="find Organization" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={9}> </Grid>

                    <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={HandleSubmit}>
                      Submit Change
                    </Button>
                    </Grid>
                    <Grid item xs={10}>
    <TableContainer component={Paper}>
      <button type="button" onClick={handleOpen}>
        Add Contact
      </button>

      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle >Input Address details</DialogTitle>
        <DialogContent>
        <Formik initialValues={ncontact} onSubmit={handleAddContact}>
        {()=>(
          <Form>
            <InputLabel htmlFor="title-native-helper">Title</InputLabel>
            <Field name= "title" as={TitleSelect} className={classes.centalign}></Field>
            <InputLabel htmlFor="title-native-helper">Frist Name:</InputLabel>
            <Field name="first_name" as={TextField} label="Input First Name"></Field>
            <InputLabel htmlFor="title-native-helper">Last Name:</InputLabel>
            <Field name="last_name" as={TextField} label="Input First Name"></Field>
            <InputLabel htmlFor="title-native-helper">Job title:</InputLabel>
            <Field name="job_title" as={TextField} label="Input Job title"></Field>
            <InputLabel htmlFor="title-native-helper">email:</InputLabel>
            <Field name="email" as={TextField} label="Input email"></Field>
            <InputLabel htmlFor="title-native-helper">state:</InputLabel>
            <Field name="state" as={TextField} label="Input state"></Field>
            <InputLabel htmlFor="title-native-helper">country:</InputLabel>
            <Field name="country" as={TextField} label="Input country"></Field><br/>
            <button type="submit">Submit</button>
          </Form>
        )}
        </Formik>
        </DialogContent>
      </Dialog>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>jobTitle</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">state</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell component="th" scope="row">
                {row.job_title}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     </Grid>

                   
    </Grid>
        </div>
    )

}

// PersonForm.getInitialProps = async (ctx: NextPageContext) =>{
//     const cookie = ctx.req?.headers.cookie;
//     const res = await fetch('/api/person', {        
//                 headers: {cookie: cookie!}})
//     const json = res.json()
//     return json
// }
export const getServerSideProps = async (ctx: NextPageContext) => {
    let resultorg: OrganizationProps[] = []
    console.log(ctx.query)
    const userId : string = ctx.query.userId?ctx.query.userId.toString():''
    console.log(userId)
    var presult: Person | undefined = undefined
    var person: Person
    const db = await getDatabaseConnection()
    const orep = db.getRepository<Organization>('organization')
    const prep = db.getRepository<Person>('person')
    const result = await orep.find({status: "active"})
    // const repeo = await (await getDatabaseConnection())
    // .getRepository(Person)
    // .createQueryBuilder("person")
    // .where("person.userid = :id", { id: userId })
    // .getOne();
    // console.log(repeo)
    if(userId){
      presult = await prep.findOne({where: {user: userId}, relations: ["belong_organization"]})
      console.log(presult)
      console.log(await presult?.belong_organization)
    }
    person = presult? presult: new Person().generation(userId)
    console.log("+++++++++++++++")
    console.log(person.toJSON({user: userId}))
    for (let ri of result){
        resultorg.push(ri.toSimpleJSON())
    }
    
    return {'props': {'organzations' : resultorg, "person": person.toJSON({user: userId}), "userId": userId}}
  };
export default PersonForm


