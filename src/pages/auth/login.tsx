import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import toast from 'react-hot-toast';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SignInRequest } from '../../api/auth';
import { Copyright } from '../../components/copyright';
import { useAuth } from '../../hooks/use-auth';

const initialValues: SignInRequest = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export default function Login() {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError(null);
        setLoading(true);
        await auth.signIn(values.email, values.password);
        setLoading(false);
        toast.success('Login successful');
        if (auth.user) {
          navigate(`/${auth.user.role}`);
        }
      } catch (error: any) {
        setLoading(false);
        const errormessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message;
        toast.error(errormessage);
        console.error(errormessage);
        setError(errormessage);
      }
    }
  });

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon sx={{ color: 'white' }} />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
            >
              {error && (
                <Grid
                  item
                  xs={12}
                >
                  <Alert
                    severity="error"
                    color="error"
                    variant="outlined"
                  >
                    {error}
                  </Alert>
                </Grid>
              )}

              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="emal"
                  name="email"
                  autoComplete="email"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Submit
            </LoadingButton>
            <Grid
              container
              justifyContent="flex-end"
            >
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/signup"
                  variant="body2"
                >
                  No account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </React.Fragment>
  );
}
