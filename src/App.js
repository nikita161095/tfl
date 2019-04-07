import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';


const Map_ = (props) => (
  <YMaps>
    <div>
      <Map className="map" defaultState={{center: [51.508626, -0.137051], zoom: 10}}>
      <Placemark geometry={[props.lat, props.lon]} />
      </Map>
    </div>
  </YMaps>
);

class Get_time extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      path: 'https://api.tfl.gov.uk/StopPoint/' + this.props.value + '/Arrivals'
    }
  }

  componentDidMount(){
    fetch(this.state.path)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({data: responseJson , isLoading: false});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render(){
      this.state.data.sort(function (a, b) {
         if (a.timeToStation > b.timeToStation) {
             return 1;
         }
         if (a.timeToStation < b.timeToStation) {
             return -1;
         }
         return 0;
      })
      this.state.data.sort(function (a, b) {
         if (a.lineName > b.lineName) {
             return 1;
         }
         if (a.lineName < b.lineName) {
             return -1;
         }
         return 0;
      })
    var output = []; var n = -1;
    for (var i in this.state.data) {
       var time = parseInt(this.state.data[i].timeToStation / 60);
       time < 1 ? time = "due" : time = time + " min";
       if(i == 0 || this.state.data[i].lineName != this.state.data[i-1].lineName){
         n++;
         output[n] = this.state.data[i].lineName  + " : " + " " + time;
       }else {
         output[n] += " / " + time;
       }
    }
    if(this.state.isLoading){
      return (<div id="time">Loading...</div>)
    }
    return (
      <div id="time">
        <p id="time_st_name">{this.state.data[0].stationName}</p><br />
        {output.map(item => <div key={Math.random()}>{item}</div>)}
      </div>
    )
  }
}

class Get_stations extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      boxShow: false,
      isLoading: true,
      data: [],
      direction: 'outbound',
      path: 'https://api.tfl.gov.uk/line/' + this.props.value + '/route/sequence/'
    }
    this.dir = this.dir.bind(this);
  }

  dir(){
    this.componentDidMount();
  }

  time(n){
    this.setState(prevState => ({
      boxShow: true,
      num: n.id,
      lat: n.lat,
      lon: n.lon
    }));
    this.props.coordinate(n);
  }

  componentDidMount(){
    fetch(this.state.path + this.state.direction)
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({data: responseJson.stopPointSequences, isLoading: false});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render(){
      const number = this.state.num;
      if(this.state.direction == 'outbound'){this.state.direction = 'inbound'}else{this.state.direction = 'outbound'}
      if(this.state.isLoading){
      return (<div>Loading...</div>)
    }
      return (
      <div id="get_stations">
          {this.state.boxShow ? <Get_time key={Math.random()} value = {number}/> : null}
          {this.props.id != 0 ? <Get_time key={Math.random()} value = {this.props.id}/> : null}
          <span>{this.state.data[0].direction}</span><button className="button button-rounded" onClick={this.dir}>direction</button>
          {this.state.data.map(item => <div key={item.lineId}>{
              item.stopPoint.map(item => <div key={item.id} onClick={() => this.time(item)} id="name_station">{item.name}</div>)
          }</div>)}
      </div>
    )
  }
}

class Openbox1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {boxShow: false}
    this.get_number = this.get_number.bind(this);
  }

  get_number(n){
    this.setState(prevState => ({
      boxShow: true,
      num: n
    }));
  }

  render(){
    const number = this.state.num;
     return(
             <tr className="tr" id="box1">
                 <td colSpan="4">
                   <br />
                   <a onClick={() => this.get_number(1)}>1 </a><a onClick={() => this.get_number(2)}> 2 </a>
                   <a onClick={() => this.get_number(3)}> 3 </a><a onClick={() => this.get_number(4)}> 4 </a>
                   <a onClick={() => this.get_number(5)}> 5 </a><a onClick={() => this.get_number(6)}> 6</a>
                   <a onClick={() => this.get_number(7)}> 7 </a><br /><br /><a onClick={() => this.get_number(8)}> 8 </a>
                   <a onClick={() => this.get_number(9)}> 9</a><a> 10</a>
                   <a>11 </a><a> 12 </a><a> 13 </a><a> 14 </a><br /><br /><a onClick={() => this.get_number(15)}> 15 </a>
                   <a> 16</a><a> 17 </a><a> 18 </a><a> 19 </a><a> 20</a>
                   <a>21 </a><br /><br /><a> 22 </a><a> 23 </a><a> 24 </a><a> 25 </a><a> 26</a><a> 27 </a><a> 28 </a><br /><br /><a> 29 </a><a> 30</a>
                   <a>31 </a><a> 32 </a><a> 33 </a><a> 34 </a><a> 35 </a><br /><br /><a> 36</a><a> 37 </a><a> 38 </a><a> 39</a>
                 </td>
                 <td id="td_stations">{this.state.boxShow ?
                   <Get_stations coordinate={this.props.coordinate} value = {number} key={Math.random()} id={this.props.id} /> : null}
                 </td>
             </tr>
     );
  }
}

class Tab_times extends React.Component{
  constructor(props){
    super(props);
    this.state = {boxShow: false}
    this.toggleBoxShow = this.toggleBoxShow.bind(this);
  }

  toggleBoxShow() {this.setState(prevState => ({boxShow: !prevState.boxShow})); }

  render(){
     return(
          <div id="tab_times">
            <table id="tab" border="1">
              <tbody>
                <tr id="tr">
                  <td id="td_tab" onClick={this.toggleBoxShow}>1-50</td>
                  <td id="td_tab" onClick={this.toggleBoxShow}>51-100</td>
                  <td id="td_tab" onClick={this.toggleBoxShow}>101-150</td>
                  <td id="td_tab" onClick={this.toggleBoxShow}>151-200</td>
                  <td id="td_tab_n"></td>
                </tr>
                {this.state.boxShow ? <Openbox1 coordinate={this.props.coordinate} id={this.props.id}/> : null}
                <tr id="tr">
                  <td id="td_tab" >201-250</td>
                  <td id="td_tab" >251-300</td>
                  <td id="td_tab" >301-350</td>
                  <td id="td_tab" >351-400</td>
                  <td id="td_tab_n"></td>
                </tr>
                <tr id="tr">
                  <td id="td_tab" >401-450</td>
                  <td id="td_tab" >451-500</td>
                  <td id="td_tab" >501-550</td>
                  <td id="td_tab" >601-650</td>
                  <td id="td_tab_n"></td>
                </tr>
                <tr id="tr">
                  <td id="td_tab" >651-700</td>
                  <td id="td_tab" >951-1000</td>
                  <td id="td_tab_n"></td>
                </tr>
              </tbody>
            </table>
          </div>
     );
  }
}

function Buses_line(){
  return(
    <div id="buses_line">
    <div id="num_bus_div"><span></span><i>transport for London</i></div>
    </div>
  );
}

  class Body extends React.Component{
    constructor(props){
      super(props);
      this.map_coordinate = this.map_coordinate.bind(this);
      this.state = {lat: undefined, lon: undefined, id: 0};
    }

    map_coordinate = (e) => {
      this.setState({lat: e.lat, lon: e.lon, id: e.id});
    }

    render(){
      return(
        <div>
          <Buses_line />
          <Tab_times coordinate={this.map_coordinate} id={this.state.id}/>
          <Map_  lat={this.state.lat} lon={this.state.lon}/>

        </div>
      );
    }
  }

export default Body;
