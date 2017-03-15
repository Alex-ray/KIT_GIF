import React, {Component, PropTypes} from 'react';


class SearchItemContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  };

  render () {
    const {
      params: {
        id
      },
    } = this.props;

    return (
      <section>
      </section>
    );
  }
}

export default SearchItemContainer;
