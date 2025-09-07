import { getUniqueValues } from '@/app/utils/helper';
import styles from './filter.module.css';
import { data } from '@/app/data';

export default function Filter() {
  console.log(getUniqueValues(data, 'author'));
  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filter__button}>исполнителю</div>
      <div className={styles.filter__button}>году выпуска</div>
      <div className={styles.filter__button}>жанру</div>
    </div>
  );
}
