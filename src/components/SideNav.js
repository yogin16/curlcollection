import * as React from "react";
import { Navigation } from "baseui/side-navigation";


class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItemId: "default"
    }
  }

  render() {
    return (
      <Navigation
        items={this.props.items}
        activeItemId={this.state.activeItemId}
        onChange={({event, item}) => {
          // prevent page reload
          event.preventDefault();
          this.setState({ 'activeItemId': item.itemId });
          this.props.onItemSelected(item);
        }}
      />
    )
  }
}

export default SideNav