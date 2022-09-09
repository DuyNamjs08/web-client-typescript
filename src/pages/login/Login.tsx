import * as React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from "@mui/material/Link";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// auth login
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authStart } from '../../redux/action';
// backdrop
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {auth} from '../../firebase/firebase-Config'

function Login() {
  const currentUser = useSelector((state: any) => state.ReducerCheckout.currentUser);
  const error = useSelector((state: any) => state.ReducerCheckout.error);
  const isLoading = useSelector((state: any) => state.ReducerCheckout.isLoading);
  console.log('currentUser:', currentUser);
  console.log('isLoading:', isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = createTheme();
  const [loading, setLoading] = useState(false);
  console.log('Loading:', loading);
  console.log('error:', error);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    const dataLogin = {
      email: data.get('email'),
      password: data.get('password'),
      isRegister: false,
    };
    dispatch(authStart(dataLogin));
    if (error) {
      navigate('/login');
      toast.error(error);
    } else {
      navigate('/');
      setLoading(true);
    }
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <section className="pt-0">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="http://google.com">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </section>
  );
}

export default Login;
