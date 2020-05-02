import * as React from "react";
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { Button } from "baseui/button";


class Well extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: ""
    }
  }

  onClick = () => {
    fetch("/curl", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({"body": this.props.body})
    })
    .then(response => response.json())
    .then(d => {
      this.setState({response: d})  
    })
    .catch();
  }

  render() {
    return (
      <div>
        <Card>
          <StyledBody>
            {this.props.body}
          </StyledBody>
          <StyledAction>
            <Button
              onClick={this.onClick}
              overrides={{
                BaseButton: { style: { width: "100%" } }
              }}
            >
              Submit
          </Button>
          </StyledAction>
        </Card>
        <Card>
          <StyledBody>
            {JSON.stringify(this.state.response)}
          </StyledBody>
        </Card>
      </div>
    );
  }
}

export default Well