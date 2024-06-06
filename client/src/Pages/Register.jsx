import { useContext } from "react";
import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
    const {registerInfo,
        updateRegisterInfo,
        registerUser, error} = useContext(AuthContext);
  return (
    <>
        <Form onSubmit={registerUser}>
            <Row style={{
                height:'100vh',
                paddingTop:'10%',
                justifyContent:'center'
            }}>
                <Col xs={5}>
                    <Stack gap={3}>
                        <h3>Register</h3>
                        <Form.Control type="text" placeholder="Enter your name" 
                        onChange={(e)=>{
                            updateRegisterInfo({...registerInfo, name:e.target.value});
                        }}></Form.Control>
                        <div>{error?.nameError}</div>
                        <Form.Control type="email" placeholder="Enter your email"
                        onChange={(e)=>{
                            updateRegisterInfo({...registerInfo, email:e.target.value});
                        }}></Form.Control>
                        <div>{error?.emailError}</div>
                        <Form.Control type="password" placeholder="Enter your password"
                        onChange={(e)=>{
                            updateRegisterInfo({...registerInfo, password:e.target.value});
                        }}></Form.Control>
                        <div>{error?.passwordError}</div>
                        <Button style={{
                            backgroundColor:"teal",
                            border:"none"
                        }}
                        type="submit">Register</Button>
                        {/* <Alert variant="danger">error</Alert> */}
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default Register
