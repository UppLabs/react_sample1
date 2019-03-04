import { connect } from 'react-redux';
import AlertTemplate from '../../components/common/AlertTemplate';
import { alertClose } from '../../store/actions/alert';

const mapStateToProps = ({ alert }) => {
   return {
    messages: alert,
   };
 };

const mapDispatchToProps = dispatch => ({
  close: index => dispatch(alertClose(index)),
});

const Alert = connect(mapStateToProps, mapDispatchToProps)(AlertTemplate);

export default Alert;
