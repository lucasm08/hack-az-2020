import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import FlightsFilter from "./FlightsFilter";
import Flight from "./Flight";

class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasm: {}
    };
  }

  componentDidMount() {
    this.loadWasm();
  }

  loadWasm = async () => {
    try {
      const wasm = await import("external");
      this.setState({ wasm });
    } catch (err) {
      console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
    }
  };

  render() {
    const { wasm = {} } = this.state;
    (async () => {
      const result = (await wasm.my_fetch) && wasm.my_fetch("far", "sfsdf");
      console.log(result);
    })();
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={this.props.fixedHeightPaper}>
            <FlightsFilter wasm={this.state.wasm} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Flight />
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={this.props.classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Flights;
