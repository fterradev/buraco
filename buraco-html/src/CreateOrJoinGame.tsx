import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Grid, Typography } from '@material-ui/core';

export default function CreateOrJoinGame({
  onSubmit
}: {
  onSubmit?: ({ playerName }: { playerName: string }) => void
}) {
  const [playerName, setPlayerName] = useState<string>();
  const [playerNameHasError, setPlayerNameHasError] = useState(false);
  return (
    <form onSubmit={function (e) {
      e.preventDefault();
      if (playerName) {
        onSubmit?.({ playerName })
      }
    }}
    >
      <Box p={1}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="center"
            >
              <Box bgcolor="primary.main">
                <Button type="submit">Criar Partida</Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h1" align="center">
              - ou -
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="player-name"
              required
              label="Código"
              fullWidth
              error={playerNameHasError}
              onChange={e => { setPlayerName(e.target.value); setPlayerNameHasError(false) }}
              onInvalid={() => { setPlayerNameHasError(true) }}
            />
            <Box p={1}>
              <Grid
                container
                direction="row"
                justify="flex-end"
              >
                <Box bgcolor="primary.main">
                  <Button type="submit">Juntar-se à partida</Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
