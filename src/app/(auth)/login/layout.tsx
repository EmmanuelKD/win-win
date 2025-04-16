import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { ReactNode } from "react";
//   import { Logo } from "../../components/logo";
import Logo from "@/components/Logo/Logo";
import MainCard from "@/components/MainCard";
//   import { paths } from "../../paths";
//   import { TOP_NAV_HEIGHT } from "@/const";
//   import MainCard from "@/components/main-card";

const issuers = {
  // Amplify: '/assets/logos/logo-amplify.svg',
  // Auth0: '/assets/logos/logo-auth0.svg',
  Firebase: "/assets/logos/logo-firebase.svg",
  JWT: "/assets/logos/logo-jwt.svg",
};

type LayoutPropTypes = {
  children: ReactNode;
};

// Meta information
export const metadata = {
  title: "vote for 50 most influencial student",
  description: "50 most influencial students description",
  applicationName: "50 most influencial students",
  authors: "50 most influencial students",
  keywords:
    "Competition, 50 most influencial students, Sierra Leone, Univercities",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    images: "https://commercehope-app.vercel.app/opengraph-image.png",
  },
};

export default function RootLayout(props: LayoutPropTypes) {
  const { children } = props;
  // const { issuer: currentIssuer } = useAuthContext();

  return (
    <>
      <Box
        component="header"
        sx={{
          backgroundColor: "background.paper",
          position: "sticky",
        }}
      >
        <Container
          maxWidth="md"
          //    sx={{ height: TOP_NAV_HEIGHT }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              height: "100%",
            }}
          >
            <Box
              // component={NextLink}
              // href={"#"}
              sx={{
                display: "inline-flex",
                height: 24,
                width: 24,
              }}
            >
              <Logo />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          py: "64px",
        }}
      >
        <Container maxWidth="sm">
          <MainCard
            sx={{
              maxWidth: { xs: 400, lg: 475 },
              margin: { xs: 2.5, md: 3 },
              "& > *": {
                flexGrow: 1,
                flexBasis: "50%",
              },
            }}
            content={false}
            // {...other}
            border={true}
            // boxShadow
            //  shadow={theme.customShadows.z1}
          >
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 }, border:"2px solid red" }}>{children}</Box>
          </MainCard>

          <Divider
            sx={{
              mb: 3,
              mt: 6,
            }}
          />
          <Stack alignItems="center" spacing={2}>
            <Typography align="center" variant="h5">
              Welcome to Org Name
            </Typography>
            <Typography align="center" color="text.secondary" variant="body2">
              Firebase, known for its robust security features, offers
              developers a reliable and trustworthy platform to build their
              applications on{" "}
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
