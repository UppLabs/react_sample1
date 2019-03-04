import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab, NavItem, Nav } from 'react-bootstrap';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import styles from './RetailerPermissions.scss';
import Toolbar from '../../common/Toolbar';
import SlideCard from '../../common/SlideCard';
import Revenu from '../../common/Revenu';
import Button from '../../common/Button';
import RadioGroup from '../../common/RadioGroup';
import Radio from '../../common/Radio';
import Wall from '../../common/Wall';
import { numberFormatter } from '../../../utils/formatHelper';

class RetailerPermissions extends PureComponent {
  constructor(props) {
    super(props);

    const shippingCostValue = this.props.replenishment_order_shipping_cost[0];

    this.state = {
      changeShippingCost: false,
      shippingCost: 
        shippingCostValue.percentage > 0 || shippingCostValue.fixed_per_unit === 0 ? 'percentage' : 'fixed_per_unit',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const shippingCostValue = nextProps.replenishment_order_shipping_cost[0];
    const newShippingCost = 
      shippingCostValue.percentage > 0 || shippingCostValue.fixed_per_unit === 0 ? 'percentage' : 'fixed_per_unit';

    if(prevState.shippingCost !== newShippingCost && prevState.changeShippingCost !== true) {
      return {
        shippingCost: newShippingCost,
        changeShippingCost: false,
      };
    }

    return null;
  }

  onChangeShippingCost = (value) => {
    this.setState({
      shippingCost: value,
      changeShippingCost: true,
    });
  }

  updatePermissions = () => {
    const { 
      id, ecommerce_commission_percentage, 
      replenishment_discount_percentage, 
      approved_for_ecommerce,
      approved_for_replenishment,
      ecommerce_billing_method,
      replenish_billing_method,
      minimum_products_for_replenishment_order,
      replenishment_order_shipping_cost,
    } = this.props;

    const shippingCostValue = replenishment_order_shipping_cost[0];

    const newShippingCost = [{
      percentage: this.state.shippingCost === 'percentage' ? shippingCostValue.percentage : 0,
      fixed_per_unit: this.state.shippingCost === 'fixed_per_unit' ? shippingCostValue.fixed_per_unit: 0,
    }];

    const permissionData = {
      approved_for_ecommerce,
      approved_for_replenishment,
      replenishment_discount_percentage,
      ecommerce_commission_percentage,
      ecommerce_billing_method,
      replenish_billing_method,
      minimum_products_for_replenishment_order,
      replenishment_order_shipping_cost: newShippingCost,
    };

    this.props.putPermissions && this.props.putPermissions(id, permissionData);
  }
  
  render() {
    const { 
      ecommerce_commission_percentage, 
      replenishment_discount_percentage, 
      ecommerce_billing_method,
      replenish_billing_method, 
      changeDropshipAllowed,
      changeReplenishAllowed,
      approved_for_replenishment,
      approved_for_ecommerce,
      changeReplenishBilling,
      changeReplenishDiscountRevenu,
      changeDropshipBilling,
      setTab,
      minimum_products_for_replenishment_order,
      setPermissionsMinimumOrder,
      replenishment_order_shipping_cost: shippingCost,
      setPermissionsFixedPerUnit,
      setPermissionsPercentage,
      toolbarTitle,
    } = this.props;

    let replenishTitle;
    
    if(replenishment_discount_percentage>0) {
      replenishTitle = 'Replenish premium';
    } else {
      replenishTitle = 'Replenish discount';
    }
    
    return (
      <div className={styles.container}>
        <Tab.Container id="retailerPermissions" defaultActiveKey="first">
          <div>
            <div className={styles.toolbarContainer}>
              <Toolbar
                grow
                width={600}
                color='transparent'
                margin_bottom
              >
                <div className={styles.navTop}>
                  <Nav>
                    <NavItem
                      eventKey="first"
                      onClick={() => setTab('Dropship')}
                    >Dropship
                    </NavItem>
                    <NavItem
                      eventKey="second"
                      onClick={() => setTab('Replenishment')}
                    >Replenishment
                    </NavItem>
                  </Nav>
                </div>
              </Toolbar>
              <Toolbar
                name={toolbarTitle}
                width={600}
                margin_bottom
              />
            </div>
            <Tab.Content animation>
              <Tab.Pane eventKey="first">
                <SlideCard
                  title="Dropship service status"
                  description={approved_for_ecommerce ? 'Active' : 'Disabled'}
                >
                  <RadioGroup
                    name="dropshipStatus" selectedValue={''+approved_for_ecommerce}
                    onChange={changeDropshipAllowed}
                  >
                    <Radio
                      id="dropshipStatusActive" value="true"
                      label="Active"
                    />
                    <Radio
                      id="dropshipStatusDisabled" value="false"
                      label="Disabled"
                    />
                  </RadioGroup>
                </SlideCard>
                <SlideCard
                  title="Dropship billing method" 
                  description={
                    ecommerce_billing_method == 'instant' 
                    ? 'Auto billing (stripe)' 
                    : 'Manual (By report)'
                  }
                >
                  <RadioGroup 
                    name="billingMethod" selectedValue={ecommerce_billing_method}
                    onChange={changeDropshipBilling}
                  >
                    <Radio
                      id="instant" value="instant"
                      label="Auto billing (stripe)"
                    />
                    <Radio
                      id="manual" value="none"
                      label="Manual billing (by report)"
                    />
                  </RadioGroup>
                </SlideCard>
                <SlideCard
                  title="Dropship revenu share" 
                  description={
                    `Retailer: ${ecommerce_commission_percentage}%, You: ${100 - ecommerce_commission_percentage}%`
                  }
                >
                  <Revenu onChange={this.props.changeDropshipRevenu} value={ecommerce_commission_percentage} />
                </SlideCard>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SlideCard
                  title="Replenish service status"
                  description={approved_for_replenishment ? 'Active' : 'Disabled'}
                >
                  <RadioGroup
                    name="replenishStatus" selectedValue={''+approved_for_replenishment}
                    onChange={changeReplenishAllowed}
                  >
                    <Radio
                      id="replenishStatusActive" value="true"
                      label="Active"
                    />
                    <Radio
                      id="replenishStatusDisabled" value="false"
                      label="Disabled"
                    />
                  </RadioGroup>
                </SlideCard>
                <SlideCard
                  title="Minimum order"
                  description={''+minimum_products_for_replenishment_order}
                >
                  <InputNumber 
                    min={0}
                    value={minimum_products_for_replenishment_order}
                    onChange={setPermissionsMinimumOrder}
                    formatter={numberFormatter}
                  />
                </SlideCard>
                <SlideCard
                  title="Shipping cost calculation"
                  description={
                    (this.state.shippingCost === 'percentage' ? 'Flat rate per item' :
                    this.state.shippingCost === 'fixed_per_unit' ? 'Percentage per item' : null) +
                    `. Value: ${this.state.shippingCost === 'percentage' && shippingCost.length > 0 
                    ? shippingCost[0].percentage : shippingCost[0].fixed_per_unit}`
                  }
                >
                  <div className={styles.shipping}>
                    <RadioGroup 
                      name="shippingCost" selectedValue={this.state.shippingCost}
                      onChange={this.onChangeShippingCost}
                    >
                      <Radio
                        id="percentage" value="percentage"
                        label="Flat rate per item"
                      />
                      <Radio
                        id="fixed_per_unit" value="fixed_per_unit"
                        label="Percentage per item"
                      />
                    </RadioGroup>
                    <Wall />
                    <span>Value: </span>
                    <InputNumber 
                      min={0}
                      value={
                        this.state.shippingCost === 'percentage' && shippingCost.length > 0 
                        ? shippingCost[0].percentage : shippingCost[0].fixed_per_unit
                      }
                      onChange={
                        this.state.shippingCost === 'percentage' ? setPermissionsPercentage : setPermissionsFixedPerUnit
                      }
                      formatter={numberFormatter}
                    />
                  </div>
                </SlideCard>
                <SlideCard 
                  title="Replenish billing method" 
                  description={
                    replenish_billing_method == 'instant' 
                    ? 'Auto billing (stripe)' 
                    : 'Manual (By report)'
                  }
                >
                  <RadioGroup
                    name="replenishMethod" selectedValue={replenish_billing_method}
                    onChange={changeReplenishBilling}
                  >
                    <Radio
                      id="instantReplenish" value="instant"
                      label="Auto billing (stripe)"
                    />
                    <Radio
                      id="manualReplenish" value="none"
                      label="Manual billing (by report)"
                    />
                  </RadioGroup>
                </SlideCard>
                <SlideCard
                  title={replenishTitle}
                  description={
                    replenishment_discount_percentage > 0 
                    ? `+${replenishment_discount_percentage}%` 
                    :`${replenishment_discount_percentage}%`
                  }
                >
                  <Revenu
                    onChange={changeReplenishDiscountRevenu}
                    min={-100}
                    max={100}
                    value={replenishment_discount_percentage}
                  />
                </SlideCard>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
        <Button 
          variant="raised" color="green" 
          text="Update Terms"
          onClick={this.updatePermissions}
          disabled={!this.props.changed}
        />
      </div>
    );
  }
}

export default RetailerPermissions;

RetailerPermissions.propTypes = {
  changeDropshipAllowed: PropTypes.func.isRequired,
  changeReplenishAllowed: PropTypes.func.isRequired,
  approved_for_ecommerce: PropTypes.bool.isRequired,
  approved_for_replenishment: PropTypes.bool.isRequired,
  changeDropshipBilling: PropTypes.func.isRequired,
  changeReplenishBilling: PropTypes.func.isRequired,
  changeDropshipRevenu: PropTypes.func.isRequired,
  changeReplenishDiscountRevenu: PropTypes.func.isRequired,
  ecommerce_commission_percentage: PropTypes.number.isRequired,
  replenishment_discount_percentage: PropTypes.number.isRequired,
  putPermissions: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ecommerce_billing_method: PropTypes.string.isRequired,
  replenish_billing_method: PropTypes.string.isRequired,
  changed: PropTypes.bool.isRequired,
  setTab: PropTypes.func.isRequired,
  minimum_products_for_replenishment_order: PropTypes.number.isRequired,
  setPermissionsMinimumOrder: PropTypes.func.isRequired,
  replenishment_order_shipping_cost: PropTypes.arrayOf(PropTypes.shape({
    percentage: PropTypes.number,
    fixed_per_unit: PropTypes.number,
  })).isRequired,
  setPermissionsFixedPerUnit: PropTypes.func.isRequired,
  setPermissionsPercentage: PropTypes.func.isRequired,
  toolbarTitle: PropTypes.string.isRequired,
};
