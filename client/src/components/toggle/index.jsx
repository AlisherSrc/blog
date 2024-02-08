import styles from './toggle.module.css';

const Toggle = (props) => {
    const {handleChange, isChecked} = props;

    return <div className={`${styles.toggle_container}`}>
        <input
        type='checkbox'
        id='check'
        className={`${styles.toggle}`}
        onChange={handleChange}
        checked={isChecked}
        />
        <label htmlFor='check'>Dark Mode</label>
    </div>
}

export default Toggle;