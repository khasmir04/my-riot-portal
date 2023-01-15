import * as React from "react";
import "./styles.css";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MainLayout from "./components/MainLayout";
import { Card, CardContent } from "@mui/material";
import moment from "moment";
// import axios from "axios";

interface UserData {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #d1363a;
    :hover {
      background-color: #9a282b;
    }
  }
`;

export default function App() {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    accountId: "",
    puuid: "",
    name: "",
    profileIconId: 0,
    revisionDate: 0,
    summonerLevel: 0
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const runApi = true;

  const [summonerName, setSummonerName] = useState("");
  const [error, setError] = useState("");

  const onClick = (e: any) => {
    e.preventDefault();
    if (inputRef.current) setSummonerName(inputRef.current.value);
    // if (runApi) getUserPuuid(summonerName);
  };

  // useEffect(() => {
  //   if (!userData.puuid) console.log("PLEASE LOGIN");
  // }, [userData]);

  useEffect(() => {
    const getUserPuuid = async (name: string) => {
      try {
        if (inputRef.current && inputRef.current.value === "") return;
        if (!runApi) {
          console.log("API Paused");
          return;
        }
        let searchName = name.replace(" ", "%20");
        // let res = await axios.get(
        //   `${process.env.REACT_APP_API_URL_PH}/tft/summoner/v1/summoners/by-name/Jullibee?api_key=${process.env.REACT_APP_API_KEY}`
        // );
        // let { data } = res.data;
        const res = await fetch(
          `${process.env.REACT_APP_API_URL_PH}/tft/summoner/v1/summoners/by-name/${searchName}?api_key=${process.env.REACT_APP_API_KEY}`
          // "https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Mir/solo?api_key=RGAPI-9b0564e8-a146-4b81-ae7c-056476713fad"
        );
        const data = await res.json();
        setUserData(data);
        // localStorage.setItem("puuid", data.puuid);
        // console.log(data);
        setError("");
        console.log("success");
      } catch (error) {
        console.log("failed");
        setError("User not found.");
        setUserData({
          id: "",
          accountId: "",
          puuid: "",
          name: "",
          profileIconId: 0,
          revisionDate: 0,
          summonerLevel: 0
        });
        console.log(error);
      }
    };
    getUserPuuid(summonerName);
  }, [summonerName, runApi]);

  const {
    id,
    accountId,
    puuid,
    name,
    profileIconId,
    revisionDate,
    summonerLevel
  } = userData;

  const date = moment.unix(revisionDate / 1000).format("DD/MM/YYYY HH:mm:ss");

  return (
    <div className="App">
      <MainLayout>
        <Card sx={{ maxWidth: 600, margin: "auto", marginTop: "100px" }}>
          <CardContent>
            <StyledForm style={{ display: "flex" }}>
              <TextField
                id="IGN"
                label="IGN"
                variant="outlined"
                name="IGN"
                inputRef={inputRef}
                required={true}
              />
              <Typography component="div" sx={{ color: "red" }}>
                {error}
              </Typography>
              <StyledButton
                onClick={(e) => onClick(e)}
                variant="contained"
                type="submit"
                sx={{ marginTop: 2 }}
              >
                SUBMIT
              </StyledButton>
            </StyledForm>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>IGN:</b> {name}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>Level:</b> {summonerLevel}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>Icon: </b>
              {profileIconId && (
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profileIconId}.png`}
                  alt={`${profileIconId}`}
                  width={50}
                />
              )}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>Last active:</b> {revisionDate === 0 ? "0" : date}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>ID:</b> {id}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>Account ID:</b> {accountId}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              <b>PUUID:</b> {puuid}
            </Typography>
          </CardContent>
        </Card>
      </MainLayout>
    </div>
  );
}
