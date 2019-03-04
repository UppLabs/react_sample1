export const perPageFilter = [
    {
    label: '20 per page',
    value: 20,
    },
    {
      label: '50 per page',
      value: 50,
    },
    {
      label: '100 per page',
      value: 100,
    },
];

export const productsFilter = [
  {
    label: 'Product Name',
    value: 'title',
  },{
    label: 'Date Uploaded',
    value: 'created_at',
  },
];

export const productsBrandFilter = [
  {
    label: require('../images/filter-brands/brand1.png'),
    value: 'Brand1',
  },
  {
    label: require('../images/filter-brands/brand1.png'),
    value: 'Brand2',
  },
];

export const filters = [
  {
    label: 'Last 30 days',
    value: 30,
  },
  {
    label: 'Today',
    value: 1,
  },
  {
    label: 'Yesterday',
    value: 2,
  },
  {
    label: 'Last 7 days',
    value: 7,
  },
  {
    label: 'This Month',
    value: 'this_month',
  },
  {
    label: 'Last Month',
    value: 'last_month',
  },
  {
    label: 'Last year',
    value: 'last_year',
  },
  {
    label: 'Custom Range',
    value: 'custom',
  },
];

export const retailers = [
  {
    label: 'Retailers(all)',
    value: 'all',
  },
];

export const retailersFilter = [
  {
    label: 'Retailer Name',
    value: 'retailer.name',
  },
  {
    label: 'Request Date',
    value: 'created_at',
  },
];