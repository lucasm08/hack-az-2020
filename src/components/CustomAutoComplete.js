import "isomorphic-fetch";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import throttle from "lodash/throttle";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const CustomAutoComplete = props => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const fetchData = React.useMemo(
    () =>
      throttle((input, callback) => {
        fetch(
          `https://hack-2020-flask.herokuapp.com/while_typing?text=${input}`
        ).then(callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    fetchData({ input: inputValue }, results => {
      const airports = results.json().then(data => data);
      if (active) {
        setOptions(Object.keys(airports).map(key => airports[key].item[0]));
      }
    });

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [inputValue, fetch, open]);

  return (
    <Autocomplete
      id={`autcomp-${props.key}`}
      style={{ width: 250 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={`${props.type}`}
          fullWidth
          onChange={handleChange}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
