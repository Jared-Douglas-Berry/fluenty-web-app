import React, {useState, useEffect} from 'react';
import styles from './DynamicTable.module.scss';
import Image from "next/image";
import {MdOutlineEdit} from "react-icons/md";
import {FaTrashAlt} from "react-icons/fa";
import Link from "next/link";

const DynamicTable = ({apiEndpoint, createPageUrl}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiEndpoint);
                const jsonData = await response.json();
                setData(jsonData.documents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [data]);


    const handleToggle = async (item) => {
        const isConfirmed = window.confirm('Are you sure you want to make this feature on home page?');
        if (isConfirmed) {
            try {
                console.log('Item', item)
                const formData = {
                    isFeaturedId: item._id,
                    isFeatured: !item.isFeatured
                }

                const res = await fetch(apiEndpoint, {
                    method: 'PUT',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    // Remove the deleted item from the state
                    setData(prevData => prevData.filter(dataItem => dataItem.isFeatured !== item.isFeatured));
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const filteredKeys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== '_id' && key !== 'password' && key !== 'isFeatured') : [];

    const renderTableCell = (value) => {
        if (value instanceof Date && !isNaN(value)) {
            return new Date(value).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } else if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)) {
            return new Date(value).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        } else if (typeof value === 'object') {
            return <Image src={value.src} alt={value.name} width={40} height={40}/>;
        }
        return value;
    };


    const handleDelete = async (item) => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        if (isConfirmed) {
            try {
                const formData = {
                    documentIdToDelete: item._id
                }

                const res = await fetch(apiEndpoint, {
                    method: 'DELETE',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (res.ok) {
                    // Remove the deleted item from the state
                    setData(prevData => prevData.filter(dataItem => dataItem._id !== item._id));
                }

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    if (data.length === 0) {
        return (
            <div className={styles.container}>
                <h1>Sorry there is no data</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Modify</th>
                    <th>Feature On Home Page</th>
                    {filteredKeys.map(key => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <div className={styles.icons}>
                                <Link href={`${createPageUrl}?data=${encodeURIComponent(JSON.stringify(item))}`}>
                                    <MdOutlineEdit className={styles.edit} size={40}/>
                                </Link>

                                <FaTrashAlt onClick={() => handleDelete(item)} className={styles.trash} size={40}/>
                            </div>
                        </td>
                        {Object.keys(item).filter(key => key === 'isFeatured').map((key, index) => (
                            <td key={index}>
                                    <div className={styles.toggleContainer}>
                                        <input
                                            type="checkbox"
                                            className={styles.toggleInput}
                                            checked={item[key] || false}
                                            onClick={() => handleToggle(item)}
                                        />
                                        <div className={styles.slider}></div>
                                    </div>
                            </td>
                        ))}
                        {Object.keys(item).filter(key => key !== '_id' && key !== 'password' && key !== 'isFeatured').map((key, index) => (
                            <td key={index}>
                                    <div className={styles.columns}>{renderTableCell(item[key])}</div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;