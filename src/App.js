import React, { Component } from "react";
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

import data from './data.json';

const filterData = (data) => {
  let filterObj = {};
  for (let i of data) {
    // console.log(i.appropriation);
    if (filterObj[i.appropriation]) {
      continue
    } else {
      filterObj[i.appropriation] = true;
    }
  }
  return { appropriation: filterObj }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: null
    };
  }

  componentDidMount() {
    console.log(data);
    let filterObj = filterData(data)
    console.log(filterObj);
    this.setState({ valueFilter: filterObj, data: data, loaded: true })
    // this.setState({ data: data, loaded: true })
    // axios({
    //   method: 'get',
    //   url: 'https://highways.hidot.hawaii.gov/dataset/SMP_Cust_Cols/kc7u-4x7r.json',
    //   headers: '',
    // })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({ data: response.data, loaded: true })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Hello</h1>
        {(this.state.loaded ? <PivotTableUI
                data={this.state.data}
                onChange={(s) => {
                  this.setState(s)
                }}
                aggregatorName="Sum"
                cols={["object"]}
                rows={["project"]}
                colOrder="key_a_to_z"
                rowOrder="key_a_to_z"
                vals={["amount"]}
                hiddenFromDragDrop={["amount"]}
                {...this.state}
            /> : null)}
      </div>
    );
  }
}
