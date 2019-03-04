import React, { PureComponent } from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import SimpleInput from '../../common/SimpleInput';
import styles from './DropshipProductCardInfo.scss';

class DropshipProductCardInfo extends PureComponent {
  state = { 
    value: RichTextEditor.createValueFromString(this.props.product.description_extra, 'html'),
    edit: false,
    product: this.props.product,
    currentImage: 
      this.props.product.images.length > 0 
      ? this.props.product.images[0] 
      : null,
  }

  handleChange = (event) => {
    this.setState({
      product: {
        ...this.state.product,
        [event.target.name]: event.target.value, 
      }, 
    });
  }

  handleChangeExtra = (value) => {
    this.setState({
      value: value,
      product: {
        ...this.state.product,
        description_extra: value.toString('html'),
      }, 
    });
  }

  openEdit = () => {
    this.setState({
      edit: true,
    });
  }

  resetDefault = () => {
    this.setState({
      value: RichTextEditor.createValueFromString(this.props.product.description_extra, 'html'),
      product: this.props.product,
    });
  }

  saveProduct = () => {
    const { product } = this.state;

    const data = {
      retailer_title: product.title,
      retailer_description: product.description,
      retailer_description_extra: product.description_extra,
    };

    this.props.setProduct(data);
    this.setState({
      edit: false,
    });
  }

   render() {
     const { product, value, currentImage } = this.state;

      return (
        <div className={styles.container}>
          <div className={styles.body}>
            <div>
              <div className={styles.image}>
                <img src={currentImage} alt="Product" />
              </div>
              <div className={styles.imagesList}>
                {product.images.map(value => (<img
                  key={value} src={value}
                  alt="Product"
                  onClick={() => this.setState({
                    currentImage: value,
                  })}
                />))}
              </div>
            </div>
            <div>
              { !this.state.edit ?
                <div className={styles.read}>
                  <h3>{product.title}</h3>
                  <a onClick={this.openEdit}>Edit</a>
                  <hr />
                  <h4>Description</h4>
                  <p dangerouslySetInnerHTML={{ __html: product.description }} />
                  <hr />
                  <h4>Extra Description</h4>
                  <p dangerouslySetInnerHTML={{ __html: product.description_extra }} />
                </div>
              :
                <div className={styles.edit}>
                  <SimpleInput
                    name="title" value={product.title}
                    onChange={this.handleChange}
                  />
                  <h4>Description</h4>
                  <textarea 
                    name="description"
                    value={product.description}
                    onChange={this.handleChange}
                  />
                  <h4>Extra Description</h4>
                  <RichTextEditor
                    value={value}
                    onChange={this.handleChangeExtra}
                  />
                  <div className={styles.buttons}>
                    <Button
                      color="white" uppercase={false}
                      text="Default"
                      onClick={this.resetDefault}
                    />
                    <Button
                      uppercase={false} text="Approve"
                      onClick={this.saveProduct}
                    />
                  </div>
                </div>
              }
            </div>                  
          </div>
        </div>
      );
   }
}

export default DropshipProductCardInfo;

DropshipProductCardInfo.propTypes = {
  product: PropTypes.shape({
    description_extra: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.array,
  }).isRequired,
  setProduct: PropTypes.func.isRequired,
};