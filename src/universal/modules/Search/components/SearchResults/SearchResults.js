import React, {PropTypes, Component} from 'react';

class SearchResults extends Component {
  static propTypes = {
    source: PropTypes.array
  };

  render () {
    const {
      source
    } = this.props;

    console.log(source);
    return (
      <aside>

      </aside>
    );
  }
}


export default SearchResults;
