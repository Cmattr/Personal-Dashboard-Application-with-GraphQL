import { Button, Card, Container } from 'react-bootstrap';
import { useComment } from './use';
import { Link, useParams } from 'react-router-dom';
import NavBar from './NavBar';

const CommentPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const { data, loading, error } = useComment(id || '');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!data?.comment) return <p>No comment found</p>;

    return (
        <div>
            <NavBar/>
            <Container>  
                <Link to="/post">
                    <Button style={{ margin: '10px' }}>Go Back</Button>
                </Link>
                <Card style={{ width: '18rem', margin: '5px' }}>
                    <Card.Body>
                        <h2>Comments</h2>
                        <Card.Title>{data.comment.name}</Card.Title>
                        <Card.Text>{data.comment.body}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default CommentPage;