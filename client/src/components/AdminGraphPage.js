import React from 'react'
import AdminDropDown from './AdminDropDown'
import AdminUserContainer from './AdminUserContainer'
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';
import '../styles/AdminGraphs.css';
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLine } from 'victory';

export default class AdminGraphPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {receiverData: [], giverData: []};
  }

  componentDidMount() {
    var authHeader = 'bearer ' + TokenHandler.returnAdminToken();

    fetch('/graphs', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type: "receiver"})
    }).then(res=>res.json())
    .then(res => this.setState({receiverData: res}))

    fetch('/graphs', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type: "giver"})
    }).then(res=>res.json())
    .then(res => this.setState({giverData: res}))

  }

  render(props) {

  // TO DO: POSSIBLY CHANGE FIRST GRAPH TO STACK BAR WITH BREAKDOWN OF AWARD TYPES

  // SECOND CHART SHOULD BE A LINE SHOWING AWARDS GIVEN OVER TIME

  // Initial render before fetch (Wait till both fetches have executed)
  if(this.state.receiverData.length == 0 || this.state.giverData.length == 0){
    return null;
  }

  var xNamesReceiver = this.state.receiverData.map((item, idx) => {
    return item['name'];
  });

  var xNamesGiver = this.state.giverData.map((item, idx) => {
    return item['name'];
  });

  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

    return (
      <div>
        {TokenHandler.adminTokenPresent() === true ? (
        <div className="graphContainer">
          <h3 className="graphTitle" >AWARDS RECEIVED</h3>
          <VictoryChart
            domainPadding={20}
            height={200}
           >
             <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            style={{
              tickLabels: {fontSize: 8}
            }}
            tickCount={xNamesReceiver.length}
            tickFormat= {xNamesReceiver}
            tickLabelComponent={<
                                   VictoryLabel angle={-12} //Remove if there are less than 10 points
                                   textAnchor={'middle'}
                                 />}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: {fontSize: 10}
            }}
            // tickFormat specifies how ticks should be displayed
            tickFormat={ (x) => (`${x}`)}
          />
             <VictoryBar
               style={{ data: { fill: (x) => colors[xNamesReceiver.indexOf(x.name) % colors.length] } }}
               data={this.state.receiverData}
             />
           </VictoryChart>
           <h3 className="graphTitle">AWARDS GIVEN</h3>
           <VictoryChart
             domainPadding={50}
             height={200}
            >
              <VictoryAxis
             // tickValues specifies both the number of ticks and where
             // they are placed on the axis
             style={{
               tickLabels: {fontSize: 8}
             }}
             tickCount={xNamesGiver.length}
             tickFormat= {xNamesGiver}
             tickLabelComponent={<
                                    VictoryLabel angle={-12} //Remove if there are less than 10 points
                                    textAnchor={'middle'}
                                  />}
           />
           <VictoryAxis
             dependentAxis
             style={{
               tickLabels: {fontSize: 10}
             }}
             // tickFormat specifies how ticks should be displayed
             tickFormat={ (x) => (`${x}`)}
           />
              <VictoryBar
                style={{ data: { fill: (x) => colors[xNamesGiver.indexOf(x.name) % colors.length] } }}
                data={this.state.giverData}
              />
            </VictoryChart>
        </div>
    ) :
    (
       <Redirect to='/' />
     )
  }
    </div>
    );
  }
}
