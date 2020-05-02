import * as React from "react";

import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import { Spinner } from "baseui/spinner";

import Well from './components/Well'
import SideNav from './components/SideNav'

const itemProps = {
  display: 'flex',
  width: 'scale400'
};

const wideItemProps = {
  width: 'scale1200'
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tree: {},
      selected: null
    };
  }

  componentDidMount() {
    // fetch data and update state
    fetch("/tree")
      .then(response => response.json())
      .then(d => {
        this.setState({ tree: d, loading: false })
      })
      .catch();
  }

  onItemSelected = (itemId) => { this.setState({ selected: itemId }) }

  getItem = (element) => {
    const item = {
      title: element.name,
      itemId: element.path
    }
    if (element.data) {
      item.data = element.data
    }
    if (element.children) {
      item.subNav = element.children.map(this.getItem)
    }
    return item
  }

  getItems() {
    if (this.state.tree.children) {
      console.log(this.state.tree)
      return this.state.tree.children.map(this.getItem);
    }
    return []
  }

  getBody() {
    if (this.state.selected == null) {
      return "Please select the curl!"
    }
    return this.state.selected.data
  }

  render() {
    return (
      <FlexGrid
        flexGridColumnCount={2}
        flexGridColumnGap="scale800"
      >
        <FlexGridItem {...itemProps}>
          <SideNav
            items={this.getItems()}
            onItemSelected={this.onItemSelected}
          />
        </FlexGridItem>

        <FlexGridItem {...wideItemProps}>
          <Well 
            body={this.getBody()}
          />
        </FlexGridItem>
      </FlexGrid>
    );
  }
}

export default App