import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';

const Datepicker = ({selectedDate, setSelectedDate, label}) => {
    const handleChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={styles.datepickerContainer}>
            <label htmlFor="date" className={styles.label}>
                {label}
            </label>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                className={styles.datepicker} // Apply custom styling to the datepicker
            />
        </div>
    );
};

export default Datepicker;