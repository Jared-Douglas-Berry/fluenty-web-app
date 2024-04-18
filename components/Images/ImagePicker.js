import styles from './ImagePicker.module.scss';
import { useRef } from "react";
import Image from "next/image";

export default function ImagePicker({ label, name, pickedImage, setPickedImage }) {
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage([]);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            const imageData = {
                src: fileReader.result,
                name: file.name, // Add any additional information you need
                type: file.type  // Add any additional information you need
            };
            setPickedImage(imageData);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image is picked yet.</p>}
                    {pickedImage && <Image src={pickedImage.src} alt="The Image Selected" fill />}
                </div>
                <input
                    className={styles.input}
                    type='file'
                    id={name}
                    accept='image/png, image/jpeg, image/svg+xml'
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                />
                <button
                    className={styles.button}
                    type='button'
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}