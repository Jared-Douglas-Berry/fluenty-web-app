import {useState} from "react";
import styles from './DropDown.module.css';

export default function DropDown({ options, onSelect }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div className={styles.dropdown}>
            <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
                <option disabled value="">Subject</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
