import { AppBar, Button, makeStyles, Toolbar, Typography, Menu, MenuItem} from '@material-ui/core';
// import Link from 'next/link';
import Link from 'next/link'
import React from 'react';

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



const ProfileButton =()=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useUser()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(user.id){
    return (
      <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      {user.email}
      </Button>
      <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <Link href={`/person/${user.id}`}>
          <a>Self Register</a>
        </Link>
        </MenuItem>
      <MenuItem onClick={handleClose}>          
      <Link href = {`/user/${user.id}`}>
            <a>My account</a>
      </Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>      
      <Link href ="/logout">
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
            <a>Register Project</a>
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

const OrgButton =()=>{
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user= useUser()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if(user.role == 'admin'){
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
  }else if(user.id){
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
  const user= useUser()
  console.log(user)
//   const stateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     console.log(event.target.value);
// };
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
      <OrgButton></OrgButton>
      <ProfileButton></ProfileButton>
      </Toolbar>
    </AppBar>
  );
}