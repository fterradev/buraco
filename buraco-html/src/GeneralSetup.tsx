import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, useTheme } from '@material-ui/core';
import GamePlayerName from './GetPlayerName';
import CreateOrJoinGame from './CreateOrJoinGame';
import * as comms from './comms';

export default function GeneralSetup() {
  const theme = useTheme();
  useEffect(() => {
    comms.connect();
    console.log("conectando");
    return () => comms.disconnect();
  }, []);
  const [playerName, setPlayerName] = useState<string>();
  return (
    <Box bgcolor="primary.light">
      <Container maxWidth="xs" /* style={{ backgroundColor: theme.palette.primary.light }} */>
        <Grid
          container
          direction="column"
          spacing={4}
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Buraco
          </Typography>
          </Grid>
          <Grid item>
            {!playerName && (
              <GamePlayerName onSubmit={({ playerName }) => {
                setPlayerName(playerName);
                comms.setPlayerName(playerName);
              }} />
            )}
            {playerName && (
              <CreateOrJoinGame onCreateMatch={() => {
                comms.createMatch();
              }} />
            )}
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
