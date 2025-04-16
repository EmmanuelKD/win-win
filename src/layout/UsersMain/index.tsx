"use client";
import { useDialog } from "@/hooks/use-dialog";
import {
  ClockCircleOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TabContext, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next-nprogress-bar";
import HexagonButtonComponent from "@/components/contestants/card/hexagon-button";
import ContestantCard from "@/components/contestants/card";
import LeaderBoardTable from "@/components/contestants/leader-board";
import ActivitiesStreamBoardTable from "@/components/activities";
import Contestant from "@/components/contestants";

const tabOptions = [
  {
    label: "Leader board",
    path: "#leaderboard",
    icon: <StarOutlined />,
  },
  {
    label: "Contestants",
    path: "#contestants",
    icon: <UserOutlined />,
  },
  {
    label: "Activities",
    path: "#activities",
    icon: <ClockCircleOutlined />,
  },
];

const ENF_OF_PRODUCT_ERROR = { message: "No more fata to fetch" };

const UsersMain = () => {
  const fragment = window.location.hash.substring(1);

  const [selectedTab, setSelectedTab] = useState(
    tabOptions.find((option) => {
      return option.path === `#${fragment ? fragment : "leaderboard"}`;
    })
  );
  const router = useRouter();
  const handleTabsChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    setSelectedTab(
      tabOptions.find((option) => {
        return option.path === value;
      })
    );

    router.push(`/${value}`);
  };

  // const currentTab = ;

  // const { open, handleOpen, handleClose } = useDialog();
  useEffect(() => {
    // if(selected)
  }, [selectedTab]);
  return (
    <>
      <Head>
        <title>Products and Services</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <TabContext value={selectedTab?.path as string}>
          <Container maxWidth="md">
            <Stack direction="row" justifyContent="center" width={"md"}>
              <Stack spacing={1} justifyContent={"center"}>
                <Typography variant="h4" textAlign={"center"}>
                  Pool services
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Tabs
                    onChange={handleTabsChange}
                    value={selectedTab?.path}
                    variant="scrollable"
                  >
                    {tabOptions.map((option) => (
                      <Tab
                        key={option.path}
                        label={option.label}
                        value={option.path}
                        icon={option.icon}
                        iconPosition="start"
                      />
                    ))}
                  </Tabs>
                </Stack>
              </Stack>
            </Stack>

            <TabPanel value={"#leaderboard"} sx={{ mx: 0, px: 0 }}>
              <LeaderBoardTable />
            </TabPanel>
            <TabPanel value={"#contestants"}>
              <Contestant />
            </TabPanel>
            <TabPanel value={"#activities"}>
              <ActivitiesStreamBoardTable />
            </TabPanel>
          </Container>
        </TabContext>
      </Box>
    </>
  );
};

export default UsersMain;
