import React, { Component } from "react";
import axios from 'axios';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import get from 'lodash.get';
import first from 'lodash.first';
import compact from 'lodash.compact';
import omitby from 'lodash.omitby';
import isnil from 'lodash.isnil';

const objCodes = [
  '5801 - R&M - Office Furniture and Equipment - Special',
  '5811 - R&M - Machinery and Equipment - Special',
  '5821 - R&M Building and Structure - Special',
  '5831 - R&M - Grounds - Special',
  '5892 - R&M - Others - Special',
  '7107 - Personal Services Rendered by Others-Special Maint'
]

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
    axios.get('https://hdot-api.herokuapp.com/podata')
      .then((response) => {
        //console.log(response);
        let filterObj = filterData(response.data)
        //console.log(filterObj);
        this.setState({ valueFilter: filterObj, data: response.data, loaded: true })
        //this.setState({ data: data, loaded: true })
      })
      .catch((error) => {
        console.log(error);
      });
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
