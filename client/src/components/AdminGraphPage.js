import React from 'react'
import AdminDropDown from './AdminDropDown'
import AdminUserContainer from './AdminUserContainer'
import TokenHandler from '../client-auth/TokenHandler';
import { Redirect } from 'react-router-dom';
//import {Row, Col} from 'react-bootstrap'
import {VictoryChart, VictoryBar, VictoryTheme } from 'victory';

export default class AdminGraphPage extends React.Component {

  constructor(props) {
    super(props);

  }



  render(props) {

    //Referenced: https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt
    //Referenced: https://github.com/XBLDev/ReactJSNodejsAuthRouterv4
    var sampleData =  [
    { x: 1, y: 2},
    { x: 2, y: 3},
    { x: 3, y: 5},
    { x: 4, y: 4},
    { x: 5, y: 6}
  ];

    return (
      <div>
        {TokenHandler.adminTokenPresent() === true ? (
        <div className="graphContainer">
          <h3>Awards Received</h3>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}
            height={200}
           >
             <VictoryBar
               style={{ data: { fill: "#c43a31" } }}
               data={sampleData}

             />
           </VictoryChart>
           <h3>Awards Given</h3>
           <VictoryChart
             theme={VictoryTheme.material}
             domainPadding={10}
             height={200}
            >
              <VictoryBar

                style={{ data: { fill: "#c43a31" } }}
                data={sampleData}
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
