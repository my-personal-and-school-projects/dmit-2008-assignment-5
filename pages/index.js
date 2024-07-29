import { useState, useEffect } from 'react';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { faker } from '@faker-js/faker';

import { getRandomDog } from '../utils/api/dog';

import Loading from '../components/Loading';

const CENTER_PROPS = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function Home() {
  const [dogImage, setDogImage] = useState();
  const [dogName, setDogName] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDog();
  }, []);

  const getDog = () => {
    setLoading(true);
    getRandomDog().then((data) => {
      setLoading(false);
      // uncomment the following line to see the data returned from the API (in the tests)
      // console.log(data)
      setDogImage(data.message);
      setDogName(faker.name.firstName());
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dinder - meet dogs near you</title>
        <meta name="description" content="Dog matching app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="sm">
          {loading ? (
            <Loading text="Loading dog..." />
          ) : (
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} {...CENTER_PROPS}>
                <Typography variant="h5" component="h1">
                  Welcome to Dinder
                </Typography>
              </Grid>
              <Grid item xs={12} {...CENTER_PROPS}>
                <img
                  data-testid="dog-image"
                  src={dogImage}
                  alt={dogName}
                  width={300}
                  height={300}
                />
              </Grid>
              <Grid item xs={12} {...CENTER_PROPS}>
                <Typography variant="h5" component="h1">
                  {dogName}
                </Typography>
              </Grid>
              <Grid item xs={6} {...CENTER_PROPS}>
                <Button variant="contained" color="error" onClick={getDog}>
                  Nope
                </Button>
              </Grid>
              <Grid item xs={6} {...CENTER_PROPS}>
                <Button variant="contained" color="success" onClick={getDog}>
                  Like
                </Button>
              </Grid>
            </Grid>
          )}
        </Container>
      </main>
    </div>
  );
}
