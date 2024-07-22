import { Box, Grid } from "@mui/material";
import Heading from "../../../reusable/Heading";
import Layout from "../../../reusable/Layout";
import { getWeatherIcon } from "../../../../utils/WeatherIcons";

interface DetailsProps {
  place: string;
  temperature: string;
  icon: string;
  description: string;
  date: string;
}

const Details: React.FC<DetailsProps> = ({
  place,
  date,
  temperature,
  icon,
  description,
}) => {
  return (
    <Grid container>
      <Grid padding={2} xs={12} item>
        <Box mt={"-0.8rem"}>
          <Heading title={"CURRENT WEATHER"} />
        </Box>
        <Grid container>
          <Grid xs={4} item>
            <Layout first={place} second={date} />
          </Grid>
          <Grid xs={4} item>
            <Layout first={temperature} second={description} />
          </Grid>
          <Grid xs={4} item>
            <Box
              component="img"
              sx={{
                width: { xs: "50px", sm: "60px" },
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                margin: "0 auto",
                padding: "0",
              }}
              alt="weather"
              src={getWeatherIcon(description, icon.indexOf('n') !== -1 ? true : false)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
