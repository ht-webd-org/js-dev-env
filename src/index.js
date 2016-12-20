import './index.css';
import numeral from 'numeral';

const houseValue = numeral(1000).format('$0,0.00');
console.log(`This house is worth ${houseValue}`); // eslint-disable-line no-console
