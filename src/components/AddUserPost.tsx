import { useMutation } from "@apollo/client";
import React, { FormEvent, useRef, useState } from "react";
import { ADD_USER_POST, DELETE_USER_POST } from "../Queries/Mutations";
import { Button, Form, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET_USER_POST } from "../Queries/Queries";

const CreatePostForm: React.FC = () => {
    const [createPost, { data, loading, error }] = useMutation(ADD_USER_POST);
    const [deletePost, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER_POST);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const inputTitle = useRef<HTMLInputElement>(null);
    const inputBody = useRef<HTMLTextAreaElement>(null); 

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (inputTitle.current && inputBody.current) {
            try {
                await createPost({
                    variables: {
                        input: {
                            title: inputTitle.current.value,
                            body: inputBody.current.value,
                        },
                    },
                    refetchQueries: [{ query: GET_USER_POST }],
                });

                inputTitle.current.value = "";
                inputBody.current.value = "";
            } catch (e) {
                console.error("Error creating post:", e);
                setErrorMsg("Failed to create post");
            }
        }
    };

    const handleDeletePost = async ( inputTitle: string) => {
        try {
            await deletePost({
                variables: { inputTitle },
                refetchQueries: [{ query: GET_USER_POST }],
            });
            setErrorMsg(null);
        } catch (e) {
            setErrorMsg("Failed to delete post");
            console.error("Failed to delete post", e);
        }
    };

    if (loading || deleteLoading) return <p>Loading...</p>;
    if (error || deleteError) return <p>Error: {error?.message || deleteError?.message}</p>;

    return (
        <div>
            <Form  className="form" onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                {errorMsg && <p className="text-danger">{errorMsg}</p>}
                <Form.Group controlId='formtitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        ref={inputTitle}
                    />
                </Form.Group>

                <Form.Group controlId="formbody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter body"
                        ref={inputBody}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Post
                </Button>
            </Form>

            {data && data.createPost && (
                <Col xs={12} sm={6} md={4} lg={3} className="mt-4">

                        <Card style={{ width: "100%", maxWidth: "18rem", margin: '5px' }}>
                            <Card.Body>
                                <Card.Title>Title: {data.createPost.title}</Card.Title>
                                <Card.Text> Body: {data.createPost.body}</Card.Text>
                                <Button variant="danger" onClick={() => handleDeletePost(data.createPost.id)}>
                                    Delete Post
                                </Button>
                            </Card.Body>
                        </Card>
                
                </Col>
            )}
        </div>
    );
};

export default CreatePostForm;
