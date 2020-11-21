import React, { useRef, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, useTheme } from '@material-ui/core';
import GamePlayerName from './GetPlayerName';
import CreateOrJoinGame from './CreateOrJoinGame';

export default function GeneralSetup() {
  const theme = useTheme();
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
              <GamePlayerName onSubmit={({ playerName }) => { setPlayerName(playerName) }} />
            )}
            {playerName && (
              <CreateOrJoinGame onSubmit={({ playerName }) => { setPlayerName(playerName) }} />
            )}
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}
