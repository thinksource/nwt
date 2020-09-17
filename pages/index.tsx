import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

export default function Index() {
  const router = useRouter()
  const handlePerson=()=>{ router.push('/person/search')}
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          The AAAiH project manager
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link><br />
        <Button onClick={handlePerson} variant="contained" color="default">Person List</Button>&nbsp;
        <Button onClick={handlePerson} variant="contained" color="secondary">Project List</Button>&nbsp;
        <Button onClick={handlePerson} variant="contained" color="primary">Technology List</Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
