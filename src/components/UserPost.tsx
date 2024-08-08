import React, { useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_POST } from "../Queries/Queries";
import { ADD_USER_POST, UPDATE_USER_POST, DELETE_USER_POST } from "../Queries/Mutations";
import CreatePostForm from "./AddUserPost";
import NavBar from "./NavBar";



interface Post {
    id: string;
    title: string;
    body: string;
}

const UserPost: React.FC = () => {
    const { data, loading, error } = useQuery(GET_USER_POST);
    const [updatePost] = useMutation(UPDATE_USER_POST);
    const [deletePost] = useMutation(DELETE_USER_POST);

    const [editPost, setEditPost] = useState<Post | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const posts: Post[] = data?.user?.posts?.data || [];
    

    const handleUpdatePost = async () => {
        if (editPost) {
            try {
                await updatePost({
                    variables: { id: editPost.id, title: editPost.title, body: editPost.body },
                    refetchQueries: [{ query: GET_USER_POST }]
                });
                setEditPost(null);
                setErrorMsg(null);
            } catch (e) {
                setErrorMsg("Failed to update post");
                console.error("Failed to update post", e);
            }
        }
    };

    const handleDeletePost = async (id: string) => {
        try {
            await deletePost({
                variables: { id },
                refetchQueries: [{ query: GET_USER_POST }]
            });
            setErrorMsg(null);
        } catch (e) {
            setErrorMsg("Failed to delete post");
            console.error("Failed to delete post", e);
        }
    };

    return (
        
        <Container>
        <NavBar />
        <CreatePostForm />
            {editPost && (
                <Row>
                    <Col>
                        <Form  className="form">
                        <h2>Edit Post</h2>
                            <Form.Group controlId="formEditTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEditBody">
                                <Form.Label>Body</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={editPost.body}
                                    onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleUpdatePost}>
                                Update Post
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}
            <Row>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
                            <Link to={`/post/${post.id}`}>
                                <Card style={{ width: "100%", maxWidth: "18rem", margin: '5px' }}>
                                    <Card.Body>
                                        <Card.Title>Title: {post.title}</Card.Title>
                                        <Card.Text>Body: {post.body}</Card.Text>
                              
                                    </Card.Body>
                                </Card>
                            </Link>
                            <Button
                                            variant="warning"
                                            onClick={() => setEditPost(post)}
                                            aria-label={`Edit post with title ${post.title}`}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeletePost(post.id)}
                                        >
                                            Delete
                                        </Button>
                        </Col>
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </Row>
        </Container>
    );
};

export default UserPost;
