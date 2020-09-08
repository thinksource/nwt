import React, { useState, ChangeEvent } from 'react';
import { Typography, Grid, Select, MenuItem, TextField, FormControlLabel, Switch, NativeSelect, makeStyles, Theme, createStyles, Paper } from '@material-ui/core';
import { Formik, Form, Field} from 'formik'
import { authenticated } from '../libs/auth';
import { NextPageContext, GetServerSideProps, GetServerSidePropsResult } from 'next';
import { getDatabaseConnection } from '../libs/db';
import { Organization } from '../src/entity/Organization';
import Autocomplete, { AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import _ from 'lodash';
import { ArrayInput } from '../components/ArrayInput';
// interface Props {
//     email: string
// }
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
}
const PersonForm = (p : Props)=>{
    console.log(p)
    console.log("====================")
    console.log(p.organzations)
    
    const classes = useStyles();
    const [title, setTitle] = useState<string>("");
    const [fristname, setFristname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [clinical_exp, setClinicalExp] = useState<string[]>([""]);
    const [COVID19, setCOVID19] = useState<Boolean>(false);
    const [belongOrg, setbelongOrg] = useState<OrganizationProps>();
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState< "info" | "success" | "warning" | "error" >('info');
    const [open, setOpen] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTitle(event.target.value as string);
      };
    
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
      setFristname(e.target.value)
    }
    const ChangeLastName =(e:ChangeEvent<HTMLInputElement>)=>{
      setLastname(e.target.value)
    }
    return (
      <div className={classes.root}>
            <Typography variant="h3">
            Personal information
            </Typography>
            <Formik  onSubmit ={async(_val, _formikHelpers) =>{}}  initialValues={p}>
            <Form>
                <Grid container spacing={3}>
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
                    <TextField label="Frist Name" value={fristname} onChange={ChangeFirstName}></TextField>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField label="Last Name" value={lastname} onChange={ChangeLastName}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-static"
                    label="Summary of AI healthcare expertise"
                    multiline
                    rows={4}
                    fullWidth={true}
                    placeholder="free text; 350 characters with spaces"
                    variant="outlined"
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <FormControlLabel
                    control={
                      <ArrayInput inputfields={clinical_exp} setInputFields={setClinicalExp} labeltext="keywords of experience"></ArrayInput>
                    }
                    label="Clinical expertise"
                    />
                   <FormControlLabel
                    control={
                      <Switch
                        checked={COVID19?true:false}
                        onChange={handleCOVID19}
                        name="checkedB"
                        color="secondary"
                      />
                    }
                    label=""
                    />
                    </Grid>

                    <br/>
                    <Grid item xs={9}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={p.organzations}
                        onChange ={ChangeOrg}
                        getOptionLabel={(option: OrganizationProps) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params:any) => <TextField {...params} label="find Organization" variant="outlined" />}
                        />
                    </Grid>
                    <Grid item xs={9}>
                    <Grid item xs={3}>
                      <label className={classes.centalign}>website of this org：</label>
                    </Grid>
                    <Grid item xs={3}>
                    <Button variant="contained" color="primary">
                      Add Contact
                    </Button>
                    </Grid>

                    </Grid>
                </Grid>
            </Form>

            </Formik>
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
    const db = await getDatabaseConnection()
    const orep = db.getRepository<Organization>('organization')
    const result = await orep.find({status: "active"})
    // console.log(rm)
    // console.log(db.entityMetadatas)
    // const result = await db.getRepository(Organization).find({where: {status: "active"}})
    for (let ri of result){
        resultorg.push(ri.toSimpleJSON())
    }
    
    return {'props': {'organzations' : resultorg}}
  };
export default PersonForm


