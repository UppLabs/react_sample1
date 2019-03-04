import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Phone from 'react-phone-number-input';
import styles from './UserCard.scss';
import SlideCard from '../../common/SlideCard';
import SimpleInput from '../../common/SimpleInput';
import Checkbox from '../../common/Checkbox';

class UserCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      form: {
        ...this.props.data,
        ...this.props.data.user,
      },
    };
  }

  onSubmit = () => {
    const { form } = this.state;

    const userId = form.id;
    const data = {
      ...this.state.form,
    };

    console.log(this.state.form);
    this.props.submit(userId, data);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  }

  toggleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  }

  render() {
    const { isEdit, form } = this.state;
    const { deleteUser } = this.props;

    return (
      <SlideCard
        title={`${form.first_name ? form.first_name : ''} ${form.last_name ? form.last_name : ''}`}
        description={form.job_position}
        right={!isEdit ?
          <a onClick={this.toggleEdit}>
            <span className="ic-edit" />
            Edit
          </a> :
          <Fragment>
            <a className={styles.delete} onClick={() => deleteUser(form.id)}>
              <span className="ic-bin" />
              Delete
            </a>
            <a onClick={this.onSubmit}>
              <span className="ic-edit" />
              Save
            </a>
          </Fragment>
       }
      >
        <div className={styles.container}>
          <div className={styles.info}>
            {
              !isEdit ?
                <Fragment>
                  <div>
                    <dl>
                      <dt>Allowed services:</dt>
                      <dd>Replenish</dd>
                      <dt />
                      <dd>Dropship</dd>
                      <dt />
                      <dd>Retailer Administration</dd>
                      <dt>Job position:</dt>
                      <dd>{form.job_position}</dd>
                    </dl>
                  </div>
                  <div>
                    <dl>
                      <dt>Phone number:</dt>
                      <dd>{form.phone}</dd>
                      <dt>E-mail:</dt>
                      <dd><a href="mailto:mail@address.com">{form.email}</a></dd>
                    </dl>
                  </div>
                </Fragment>
              :                 
                <Fragment>
                  <div>
                    <dl>
                      <dt>First name</dt>
                      <dd>
                        <SimpleInput name="first_name" onChange={this.handleChange} />
                      </dd>
                      <dt>Last name</dt>
                      <dd>
                        <SimpleInput name="last_name" onChange={this.handleChange} />
                      </dd>
                      <dt>Allowed services:</dt>
                      <dd>
                        <Checkbox value="Replenish" />
                      </dd>
                      <dt />
                      <dd>
                        <Checkbox value="Dropship" />
                      </dd>
                      <dt />
                      <dd>
                        <Checkbox value="Retailer Administration" />
                      </dd>
                      <dt>Job position:</dt>
                      <dd>
                        <SimpleInput name="job_position" onChange={this.handleChange} />
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <dl>
                      <dt>Phone number:</dt>
                      <dd>
                        <Phone 
                          value={form.phone}
                          onChange={(value) => {
                          this.setState({
                            form: {
                              ...form,
                              phone: value,
                            },
                          });
                        }}
                        />
                      </dd>
                      <dt>E-mail:</dt>
                      <dd>
                        <SimpleInput name="email" onChange={this.handleChange} />
                      </dd>
                    </dl>
                  </div>
                </Fragment>
            }
          </div>
        </div>
      </SlideCard>
    );
  }
}

export default UserCard;

UserCard.propTypes = {
  data: PropTypes.shape({
    administration_permission: PropTypes.bool, 
    ecommerce_permission: PropTypes.bool, 
    replenish_permission: PropTypes.bool, 
    user: PropTypes.object.isRequired,
  }).isRequired,
  deleteUser: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};