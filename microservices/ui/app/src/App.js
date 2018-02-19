import React, { Component } from 'react';
import { Grid, Icon } from "material-ui";
import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';
import Button from 'material-ui/Button/Button';
import Config from "./config/config.json";
import isEmpty from "lodash/isEmpty";

class App extends Component {

  state = {
    selectedOption: '',
    options: [
      { value: 'what is the link of course', label: 'what is the link of course' },
      { value: 'what are the contents of course', label: 'what are the contents of course' },
      { value: 'what are the reviews of course', label: 'what are the reviews of course' },
      { value: 'what is the price of course', label: 'what is the price of course' },
      { value: 'what are the list of course', label: 'what are the list of course' },
      { value: 'what are the list of available free course', label: 'what are the list of available free course' },
      { value: 'what are the list of available paid course', label: 'what are the list of available paid course' },
      { value: 'who is the instructor of course', label: 'who is the instructor of course' },
    ],
    textEntity: "",
    selectedEntity: [],
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleExtract = () => {

    let requestData = {
      method: 'POST',
      body: JSON.stringify({ "data": this.state.selectedOption.value }),
      headers: {
        'content-type': 'application/json'
      },
    };

    fetch(Config.apiURL, requestData)
      .then((responce) => responce.json())
      .then((responce) => {
        let data = {
          textEntity: "",
          selectedEntity: [],
        }
        if (responce._text) {
          data.textEntity = responce._text;
          data.selectedEntity = responce.entities.message.map((entitieData) => entitieData.value);
          this.setState(data);
        }
      });
  };

  render() {
    const { selectedOption, options } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div className="App">
        <div className="header">
          <h1 style={{ textAlign: "center" }}>Entity Extraction</h1>

        </div>
        <Grid container spacing={24}>
          <Grid item xs></Grid>
          <Grid item xs={6}>

            <div>
              <Grid container spacing={24}>
                <Grid item xs>
                  <Creatable

                    placeholder="Select or create an entity ..."
                    name="form-field-name"
                    value={value}
                    onChange={this.handleChange}
                    options={options}
                  />
                </Grid>
                <Grid item >
                  <Button
                    onClick={this.handleExtract}
                    color="primary"
                    style={{ fontWeight: "bold", boxShadow: "none", padding: "2px 1rem" }}
                    variant="raised">Exteract<Icon style={{ marginLeft: "5px" }}>send</Icon></Button>
                </Grid>
              </Grid>
            </div>
            {!isEmpty(this.state.textEntity) ?
              <div className="EntityResult">
                <div className="ResultBox">
                  <div className="textResult">{this.state.textEntity}</div>
                  <div className="textEntitys">{this.state.selectedEntity.map((data) => <span className="selectedEntity">{data}</span>)}</div>
                </div>
              </div>
              : <div className="notification">@ select or enter any value to find entitys in it ...</div>}
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    );
  }
}


export default App;
