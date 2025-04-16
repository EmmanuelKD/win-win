import { Grid } from "@mui/material";
import ContestantCard from "./card";

export default function Contestant() {
  return (
    <Grid container spacing={2} alignItems={"center"}>
      {Array.from(new Array(8)).map((i) => (
        <Grid key={i} item sm={6} md={4}>
          <ContestantCard
            contestant={{
              avatar: "/contestant.png",
              name: "Warren Fornah",
              bio: "He is a very enegitic guy from the good land of jua, he is a child of God ",
              id: "00012",
              motivationSpeech:
                "I love God, He is the sorce of my strength, he will see through what he has started",
              status: "active",
              telephone: "+232778887",
              univercity: "Limkokwing",
              votes: [
                {
                  for: "00012",
                  from: "00022",
                  point: 1000,
                  id: "87238",
                },
                {
                  for: "00012",
                  from: "00022",
                  point: 1000,
                  id: "87238",
                },
                {
                  for: "00012",
                  from: "00022",
                  point: 1000,
                  id: "87238",
                },
                {
                  for: "00012",
                  from: "00022",
                  point: 1000,
                  id: "87238",
                },
                {
                  for: "00012",
                  from: "00022",
                  point: 1000,
                  id: "87238",
                },
              ],
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
