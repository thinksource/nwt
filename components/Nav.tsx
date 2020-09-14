import { AppBar, Button, makeStyles, Toolbar, Typography, Menu, MenuItem} from '@material-ui/core';
// import Link from 'next/link';
import Link from 'next/link'
import React from 'react';
import ProjectForm from '../pages/project/update';

import { useUser } from './UserProvider';
// import { GUID, decodeAuthCookie } from '../libs/auth';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

interface NavProps {
    userId?: string,
    userRole?: string,
    email?: string
}


const ProfileButton =(props: NavProps)=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(props.userId){
    return (
      <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      {props.email}
      </Button>
      <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <Link href={`/person/${props.userId}`}>
          <a>Profile</a>
        </Link>
        </MenuItem>
      <MenuItem onClick={handleClose}>          
      <Link href = {`/user/${props.userId}`}>
            <a>My account</a>
      </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>      
      <Link href ="/api/user/logout">
            <a>Logout</a>
      </Link></MenuItem>
      </Menu>
      </>
    )
  }else{
    return (
      <Button>
        <Link href="/login">
          <a style={{ color: 'white' }}>
            Login
          </a>
        </Link>
      </Button>
    )
  }
}

const ProjectButton = ()=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useUser()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(user.role === 'active' || user.role === 'admin'){
  return (
    <>
    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Project
      </Button>
      <Menu
        id="menuproject"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>

        <MenuItem onClick={handleClose}>
          <Link href='/project/manage'>
            <a>Manage Projects</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}> 
          <Link href={`/project/update`}>
            <a>Register new project</a>
          </Link>
        </MenuItem>
        
      </Menu>
    </>
  )
  }else{
    return (<></>)
  }
}

const TechnologyButton = ()=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useUser()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(user.role === 'active' || user.role === 'admin'){
  return (
    <>
    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Technology
      </Button>
      <Menu
        id="menutechnology"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>

        <MenuItem onClick={handleClose}>
          <Link href='/technology/manage'>
            <a>Manage Technology</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}> 
          <Link href={`/technology/update`}>
            <a>Register Technology</a>
          </Link>
        </MenuItem>
        
      </Menu>
    </>
  )
  }else{
    return (<></>)
  }
}

const OrgButton =(props: NavProps)=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(props.userRole === 'admin'){
    return (
      <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      Organization
      </Button>
      <Menu
      id="og-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <Link href="/organization/add">
          <a>add</a>
        </Link>
        </MenuItem>
      <MenuItem onClick={handleClose}>          
      <Link href = "/organization">
            <a>list organization</a>
      </Link>
      </MenuItem>
      </Menu>
      </>
    )
  }else if(props.userId){
    return (
      <Button>
        <Link href="/organization/add">
          <a style={{ color: 'white' }}>
            regist a organization
          </a>
        </Link>
      </Button>
    )
  }else{
    return (<></>)
  }
}
export const Nav = ()=> {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user= useUser()
  console.log(user)
//   const stateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     console.log(event.target.value);
// };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(user.toJSON())
  console.log(classes)
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography className={classes.title}>
          My Form
        </Typography>

        <Button color="inherit">
          <Link href="/">
            <a style={{ color: 'white' }}>
              <Typography  color="inherit">
                Home
              </Typography>
            </a>
          </Link>
        </Button>


      <ProjectButton></ProjectButton>
      <TechnologyButton></TechnologyButton>
      <OrgButton userId={user.id} userRole={user.role} email={user.email}></OrgButton>
      <ProfileButton userId={user.id} userRole={user.role} email={user.email}></ProfileButton>
      </Toolbar>
    </AppBar>
  );
}

// Nav.getInitialProps = async (ctx: NextPageContext) =>{
//   const str_cookie =ctx.req?.headers.cookie
//   const ret_obj={}

//   if(str_cookie){
//     // const mycookie = cookie.parse(str_cookie);

//     // const decode = verify(mycookie.auth, GUID).valueOf() as {id: string, role: string, email:string}
//     // console.log(decode)
//     const decode = decodeAuthCookie(str_cookie)
//     console.log("Nav init", decode)
//     return decode
    
//   }
  
// }