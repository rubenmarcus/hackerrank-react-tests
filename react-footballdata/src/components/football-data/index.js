
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');

export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      matches: null
    };
  }

fetchData =  async  (year) => {
    
      const url = `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`
      const res = await fetch(url).then((res) =>  res.json()).then((data) => {
 
      return data.data
      })

      this.setState({
        matches: res,
     
      })

   

  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
   
    })

    this.fetchData(year);
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">
            {this.state.matches && this.state.matches.length > 0? ` Total Matches : ${this.state.matches.length}` : ''}

            </div>
            
            <ul className="mr-20 matches styled" data-testid="match-list">
             
                {this.state.matches && this.state.matches.length > 0? this.state.matches.map((match,i) =>   <li key={i} className="slide-up-fade-in">Match {match.name} won by {match.winner}  </li> )
           
              : <div data-testid="no-result">No Matches Found</div>
              }
               
            </ul>
          </section>

          <div data-testid="no-result" className="slide-up-fade-in no-result"></div>
        </section>
      </div>
    );
  }
}