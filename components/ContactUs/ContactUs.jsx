import styles from "./ContactUs.module.css";
import DropDown from "../Buttons/DropDown";
import Submitting from "../Buttons/Submitting";
import {useContext, useState} from "react";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaPencilAlt } from "react-icons/fa";
import NotificationContext from "../../store/notificationContext";

const options = [
    { label: 'Development', value: 'Development' },
    { label: 'Designs', value: 'Designs' },
    { label: 'SEO', value: 'SEO' },
];

export default function ContactUs() {
    const [selectedOption, setSelectedOption] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredPhone, setEnteredPhone] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const notificationCtx = useContext(NotificationContext);

    const handleSelect = (option) => {
        setSelectedOption(option);
        // Do whatever you want with the selected option
        console.log('Selected option:', option);
    };

    function handleSubmitMessage(event) {
        event.preventDefault();
        setIsLoading(true);
        setIsInvalid(false);
        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@')
        ) {
            setErrorMessage("Invalid Email")
            setIsInvalid(true);
            setIsLoading(false);
            return;
        } else if (
            !enteredName ||
            enteredName.trim() === ''
        ) {
            setErrorMessage("Invalid Full Name")
            setIsInvalid(true);
            setIsLoading(false);
            return;
        } else if (
            !enteredMessage ||
            enteredMessage.trim() === ''
        ) {
            setErrorMessage("Invalid Message")
            setIsInvalid(true);
            setIsLoading(false);
            return;
        } else if (
            !enteredPhone ||
            enteredPhone.trim() === '' ||
            enteredPhone.trim().length !== 10
        ) {
            setErrorMessage("Invalid Phone Number")
            setIsInvalid(true);
            setIsLoading(false);
            return;
        } else if (
            !selectedOption ||
            selectedOption.trim() === ''
        ) {
            setErrorMessage("Invalid Selection")
            setIsInvalid(true);
            setIsLoading(false);
            return;
        } else if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredMessage ||
            enteredMessage.trim() === '' ||
            !enteredPhone ||
            enteredPhone.trim() === '' ||
            enteredPhone.trim().length !== 10 ||
            !selectedOption ||
            selectedOption.trim() === ''
        ) {
            setErrorMessage("Invalid inputs")
            setIsInvalid(true);
            setIsLoading(false);
            return;
        }

        const messageData = {
            email: enteredEmail,
            name: enteredName,
            phone: enteredPhone,
            subject: selectedOption,
            message: enteredMessage
        };

        // send data to API
        fetch(`/api/contact`, {
            method: 'POST',
            body: JSON.stringify(messageData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return response.json().then(data => {
                    throw new Error(data.message || 'Error sending your message');
                })
            })
            .then((data) => {
                setEnteredEmail('');
                setEnteredName('');
                setEnteredMessage('');
                setEnteredPhone('');
                setSelectedOption('');
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    return (
        <section className={styles.contactUs}>
            <div className={styles.text}>
                <h3>Work Together</h3>
                <h1>Let’s Work Together For Your Next Projects</h1>
            </div>

            <form className={styles.form} onSubmit={handleSubmitMessage}>
                <div className={styles.content}>
                    <div className={styles.sections}>
                        <div className={styles.input}>
                            <IoMdPerson/>
                            <input
                                type='text'
                                id='name'
                                required
                                value={enteredName}
                                onChange={event => setEnteredName(event.target.value)}
                                placeholder="Full Name"
                            />
                        </div>

                        <div className={styles.input}>
                            <MdEmail/>
                            <input
                                type='email'
                                id='email'
                                required
                                value={enteredEmail}
                                onChange={event => setEnteredEmail(event.target.value)}
                                placeholder="Email Address"
                            />
                        </div>

                    </div>
                    <div className={styles.sections}>
                        <div className={styles.input}>
                            <FaPhoneAlt/>
                            <input
                                type='number'
                                id='phone'
                                required
                                value={enteredPhone}
                                onChange={event => setEnteredPhone(event.target.value)}
                                placeholder="Phone Number"
                            />
                        </div>

                        <div className={styles.dropdown}>
                            <DropDown options={options} onSelect={handleSelect}/>
                        </div>
                    </div>
                    <div className={styles.sectionsBox}>
                        <div className={styles.icon}>
                            <FaPencilAlt size={30}/>
                        </div>
                        <textarea
                            id='message'
                            rows='5'
                            required
                            className={styles.textBox}
                            placeholder="Message"
                            value={enteredMessage}
                            onChange={event => setEnteredMessage(event.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.actions}>
                    <Submitting
                        bntText={"Sent Message"}
                        isLoading={isLoading}
                        isInvalid={isInvalid}
                        error={errorMessage}
                    />
                </div>
            </form>
        </section>
    );
}