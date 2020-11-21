import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Grid } from '@material-ui/core';

export default function GamePlayerName({
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
      <TextField
        id="player-name"
        required
        label="Nome"
        fullWidth
        error={playerNameHasError}
        onChange={e => { setPlayerName(e.target.value); setPlayerNameHasError(false) }}
        onInvalid={() => { setPlayerNameHasError(true) }}
      />
      <Box p={1} color="primary.main">
        <Grid
          container
          direction="row"
          justify="flex-end"
        >
          <Box bgcolor="primary.main">
            <Button type="submit">Continuar</Button>
          </Box>
        </Grid>
      </Box>
    </form>
  );
}
