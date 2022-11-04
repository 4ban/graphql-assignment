import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { countryAtom, postCodeAtom } from '../store'
import { useDebounce } from '../useDebounce';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

import { Form } from './Form'
import { Result } from './Result'
import { History } from './History'

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const App = () => {
  const [country] = useAtom<string>(countryAtom);
  const [postCode] = useAtom<string>(postCodeAtom); 
  const debouncedPostCode = useDebounce<string>(postCode, 500); // Wait 500ms before using

  return (
  <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ bgcolor: '#cfe8fc', minHeight: '50vh', borderRadius: '12px'}} p={5} m={5}>
          <CenterContainer>
            <Typography variant="h3">
              Zip code info receiver!
            </Typography>
            <Form />
            {debouncedPostCode && <Result country={country} postCode={debouncedPostCode} />}
            <History />
          </CenterContainer>
        </Box>
      </Container>
      </>
  );
}

export default App;
