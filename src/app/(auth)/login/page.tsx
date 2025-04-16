"use client";
import { useAuthContext } from "@/context/auth";
import GuestGuard from "@/guards/guest";
import {
  Box,
  Button,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";

const initialValues = {
  // email: 'demo@devias.io',
  // password: 'Password123!',
  email: "",
  password: "",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .max(255)
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || undefined;
  const auth = useAuthContext();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // // @ts-ignore
        // await auth.signIn(values.email, values.password);
        // if (isMounted()) {
        //   router.push(returnTo || paths.dashboard.index);
        // }
      } catch (err: any) {
        console.error(err);
      }
    },
  });

  return (
    <GuestGuard>
      <Head>
        <title>Login | Carpatin</title>
      </Head>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 3 }}
        >
          <Typography variant="h4">Login</Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
            autoFocus
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
          />
        </Stack>
        {formik.errors.submit && (
          <FormHelperText error sx={{ mt: 3 }}>
            {formik.errors.submit}
          </FormHelperText>
        )}
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
        >
          Login
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button component={NextLink} href="#">
            Forgot password
          </Button>
        </Box>
        {/* <Alert
        // @ts-ignore
          color="primary"
          severity="info"
          sx={{ mt: 3 }}
        >
          You can use <strong>demo@devias.io</strong> and password <strong>Password123!</strong>
        </Alert> */}
      </form>
    </GuestGuard>
  );
}
