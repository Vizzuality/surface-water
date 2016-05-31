'use strict';

import {connect} from 'react-redux';
import YearSelector from '../components/YearSelector';

const mapStateToProps = state => {
  return {
    data: state.map.data.yearlyPercentage
  };
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector);
