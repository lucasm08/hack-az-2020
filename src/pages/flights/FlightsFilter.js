import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import CustomAutoComplete from "../../components/CustomAutoComplete";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

const FlightsFilter = props => {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState("left");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <form>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <ToggleButtonGroup
            size="large"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton key={1} value="left">
              Round Trip
            </ToggleButton>
            ,
            <ToggleButton key={2} value="right">
              One Way
            </ToggleButton>
            ,
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <Grid container justify="center" spacing={6}>
            <Grid key={1} item>
              <CustomAutoComplete key={1} type={"Origin"} wasm={props.wasm} />
            </Grid>
            <Grid key={2} item>
              <Autocomplete
                id="destination"
                options={airports}
                getOptionLabel={option =>
                  `${option.title}, ${option.city} , ${option.country}`
                }
                style={{ width: 220 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Destination"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid key={3} item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={selectedDate} onChange={handleDateChange} />
                <DatePicker value={selectedDate} onChange={handleDateChange} />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid key={4} item>
              <Fab color="primary" aria-label="add">
                <SearchIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default FlightsFilter;

const airports = [
  { title: "Charles De Gaulle Intl", city: "Paris", country: "France (CDG)" },
  { title: "Charles De Gaulle Intl", city: "Paris", country: "France (CDG)" },
  { title: "Charles De Gaulle Intl", city: "Paris", country: "France (CDG)" }
];
