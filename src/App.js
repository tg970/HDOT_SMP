import React, { Component } from "react";
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

import data from './data.json';

const objCodes = ['5801', '5811', '5821', '5831', '5892', '7107']

const filterData = (data) => {
  let filterObj = { appropriation: {}, object: {} };
  //let cnt = 0;
  for (let i of data) {
    // console.log(i.appropriation);
    if (!filterObj.appropriation[i.appropriation]) {
      filterObj.appropriation[i.appropriation] = true;
    }
    if (!filterObj.object[i.object]) {
      if (!objCodes.includes(i.object)) {
        filterObj.object[i.object] = true;
      } //else {
      //   filterObj.object[i.object] = true;
      // }
    }
  }
  //console.log(cnt);
  return filterObj
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    //console.log(data);
    let filterObj = filterData(data)
    console.log(filterObj);
    this.setState({ valueFilter: filterObj, data: data, loaded: true })
    // this.setState({ data: data, loaded: true })
    // axios({
    //   method: 'get',
    //   url: 'https://highways.hidot.hawaii.gov/resource/wxrr-gdbb.json?$limit=100000',
    //   headers: {
    //     //'Host': 'highways.hidot.hawaii.gov',
    //     'Accept': '*/*',
    //     // 'Authorization': 'Basic ',
    //     'Content-Type': 'application/json',
    //     'X-App-Token': 'Di04VXcc3fJZKgDmE6veI5gCM',
    //   }
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    console.log(this.state);
    return (
      <div>
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
                menuLimit={1500}
                {...this.state}
            /> : null)}
      </div>
    );
  }
}
