import { useContext } from "react"
import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext"
const Login = () => {
    const { loginInfo, error,
        updateLoginInfo, loginUser} = useContext(AuthContext);
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row style={{
                    height: '100vh',
                    paddingTop: '10%',
                    justifyContent: 'center'
                }}>
                    <Col xs={5}>
                        <Stack gap={3}>
                            <h3>Login</h3>
                            <Form.Control type="email" placeholder="Enter your email"
                            onChange={(e)=>{
                                updateLoginInfo({...loginInfo, email:e.target.value});
                            }}></Form.Control>
                            <div>{error?.emailError}</div>
                            <Form.Control type="password" placeholder="Enter your password"
                                onChange={(e)=>{
                                    updateLoginInfo({...loginInfo, password:e.target.value});
                                }}
                            ></Form.Control>
                            <div>{error?.passwordError}</div>
                            <Button style={{
                                backgroundColor: "teal",
                                border: "none"
                            }}
                                type="submit">Login</Button>
                            {/* <Alert variant="danger">error</Alert> */}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Login
