import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Grid, Typography } from '@material-ui/core';

export default function CreateOrJoinGame({
  onSubmit
}: {
  onSubmit?: ({ playerName }: { playerName: string }) => void
}) {
  const [code, setCode] = useState<string>();
  const [codeHasError, setCodeHasError] = useState(false);
  return (
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
          <form onSubmit={function (e) {
            e.preventDefault();
            if (code) {
              onSubmit?.({ playerName: code })
            }
          }}
          >
            <TextField
              id="match-code"
              required
              label="Código"
              fullWidth
              error={codeHasError}
              onChange={e => { setCode(e.target.value); setCodeHasError(false) }}
              onInvalid={() => { setCodeHasError(true) }}
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
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
