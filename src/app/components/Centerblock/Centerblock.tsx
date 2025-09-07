import styles from './centerblock.module.css';
import classnames from 'classnames';
import Search from '../Search/Search';
import Track from '../Track/Track';
import Filter from '../Filter/Filter';
import FilterItem from '../FilterItem/FilterItem';
export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <FilterItem />
        <Track />
      </div>
    </div>
  );
}
