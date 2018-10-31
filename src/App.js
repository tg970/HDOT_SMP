import React, { Component } from "react";
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: null
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://highways.hidot.hawaii.gov/dataset/SMP_Cust_Cols/kc7u-4x7r.json',
      headers: '',
    })
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data, loaded: true })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        {(this.state.loaded ? <PivotTableUI
                data={this.state.data}
                onChange={s => this.setState(s)}
            /> : null)}
      </div>
    );
  }
}
