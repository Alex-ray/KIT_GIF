import React, {PropTypes, Component} from 'react';

class Search extends Component {
  static propTypes = {
    value: PropTypes.string
  };

  handleSubmit (event) {

  }

  handleChange (event) {

  }

  render () {
    const {
      value
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' value={value} onChange={this.handleChange} placeholder='search' />
        <input type='submit' />
      </form>
    );
  }
}


export default Search;
