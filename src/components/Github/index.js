import React from "react";
import { withRouter } from "react-router";
import Repositories from "./Repositories";
import Favorites from "./Favorites";
import { Input } from 'antd';

const { Search } = Input;

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      keyword: "",
      filter: "",
    };
  }

  onSearch() {
    this.setState({
      filter: this.state.keyword
    });
  }

  handleChange(evt) {
    this.setState({
      keyword: evt.target.value
    });
  }

  render() {
    let compo;
    if (window.location.pathname.includes('favorites')) {
      compo = <Favorites filter={this.state.filter} />;
    } else {
      compo = <Repositories filter={this.state.filter} />;
    }
    return (
      <>
        <Search 
          placeholder="Input search text" 
          allowClear 
          enterButton="Search" 
          size="large" 
          onChange={this.handleChange}
          onSearch={this.onSearch}
        />
        {compo}
      </>
    );
  }
}

export default withRouter(Github);