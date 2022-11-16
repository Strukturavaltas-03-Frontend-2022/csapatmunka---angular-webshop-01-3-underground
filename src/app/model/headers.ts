export const headers = [
  {
    name: 'catId',
    label: 'Genre list',
    error: 'Must be a list of numbers between 1-16',
  },
  { name: 'name', label: 'Game title', error: 'Must be set' },
  { name: 'description', label: 'About', error: 'Must be set' },
  {
    name: 'banner',
    label: 'Banner image',
    error: 'Must start with the storage url',
  },
  { name: 'video', label: 'Banner video', error: 'Must be set' },
  { name: 'price', label: '€', error: 'Must be less than 60' },
  { name: 'onSale', label: '%', error: 'Must be less than 50' },
];
