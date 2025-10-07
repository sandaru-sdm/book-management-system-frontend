import React, { Suspense } from 'react';
import Header from '../components/Header';
const Books = React.lazy(() => import('../components/Books'));

function Home() {
    const description = (
        <>
            Effortlessly manage your book collection.
            <span className='d-block'>Add, update, and delete books with a simple interface.</span>
        </>
    );

    return (
        <main className='container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-start bg-light'>
            <Header 
                title="📚 Book Management System"
                description={description}
                buttonText="➕ Add New Book"
                buttonLink="/add-book"
            />
            
            <section className='w-100'>
                <Suspense fallback={
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }>
                    <Books />
                </Suspense>
            </section>
        </main>
    );
}

export default Home;