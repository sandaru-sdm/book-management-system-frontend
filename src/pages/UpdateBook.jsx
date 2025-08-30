import React from 'react'
import { useParams } from 'react-router-dom';

const getBooks = async () => {
    const { bookId } = useParams();
    if(bookId === undefined) return;
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/books` + bookId);
        const data = response.data; 
        console.log(data);
        return data;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw new Error('Failed to fetch books');
    }
};

function UpdateBook() {
  return (
    <div>UpdateBook</div>
  )
}

export default UpdateBook