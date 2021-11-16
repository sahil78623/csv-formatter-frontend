// import logo from './logo.svg';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Container } from 'react-bootstrap'
import {Container, Row, Col, Button, Form, Card} from 'react-bootstrap'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import TableData from './components/TableData'

function App() {

  let [URL, setURL] = useState("");
  let [totalData, setData] = useState([]);
  let [isbn, setisbn] = useState("");
  let [email, setEmail] = useState("");
  const [array, setSelectedFile] = useState([]);

  useEffect(() => {
    if (URL.length > 0) {
      const getData = async () => {
        const {data} = await axios.get(URL)
        setData(data)
      };
      getData();
    }
  }, [URL]);

  const handleISBN = () => {
    if(isbn.length > 0) {
      const getData = async () => {
        const {data} = await axios.get(`https://csv-data-formatter.herokuapp.com/api/getByISBN/${isbn}`)
        if(data.length !== 0)
          setData([data])
        else
          setData("")
        
      };
      getData();
    }
  }

  const handleEmail = () => {
    if(isbn.length > 0) {
      const getData = async () => {
        const {data} = await axios.get(`https://csv-data-formatter.herokuapp.com/api/getByEmail/${email}`)
        setData(data)
      };
      getData();
    }
  }

  const fileUpload = () => {
    const formData = new FormData();
    formData.append("author", array[0]);
    formData.append("books", array[1]);
    formData.append("magazenes", array[2]);

    axios
    .post('https://csv-data-formatter.herokuapp.com/api/upload', formData)
    .then((res) => {
      alert("File Upload success");
    })
    .catch((err) => alert("File Upload Error"));
  }

  const handleFileInput = (e) => {
    setSelectedFile(oldArray => [...oldArray, e.target.files[0]])
  }


  return (
    <>
      <h1>CSV Formatter</h1>
        <main className='py-3'>
          <Container>
            <Row>       

              <Col sm={12} md={6} lg={4}>   
                <Card className="my-3 p-3" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Add CSV files</Card.Title>
                    <Form>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Authors Data : </Form.Label>
                        <Form.Control type="file" required
                          onChange={handleFileInput}  
                        />
                      </Form.Group>

                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Books Data : </Form.Label>
                        <Form.Control type="file" required
                          onChange={handleFileInput}  
                        />
                      </Form.Group>

                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Magazenes Data : </Form.Label>
                        <Form.Control type="file" required
                          onChange={handleFileInput}  
                        />
                      </Form.Group>

                      <Button 
                        variant="primary" 
                        type="button"
                        onClick={fileUpload}
                        >
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col> 


              <Col sm={12} md={6} lg={4}>   
                <Row>
                  <Card className="my-3 p-3" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Find By ISBN</Card.Title>
                      <Form >
                        <Form.Group className="mb-3" >
                          {/* <Form.Label>Email address</Form.Label> */}
                          <Form.Control 
                            type="text" 
                            value={isbn}
                            onChange={(e) => setisbn(e.target.value)}placeholder="Enter ISBN" />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleISBN}>
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Col className="my-3 p-3" sm={12} md={6} lg={4}>   
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>Sorted By Title</Card.Title>
                        <Form>
                            <Button variant="primary" onClick={() => {setURL('https://csv-data-formatter.herokuapp.com/api/sortedData')}}>Sorted Data</Button>{' '}
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>   
                </Row>
              </Col>

              <Col sm={12} md={6} lg={4}>   
                <Row>
                  <Card className="my-3 p-3" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Find By Email</Card.Title>
                      <Form >
                        <Form.Group className="mb-3" >
                          {/* <Form.Label>Email address</Form.Label> */}
                          <Form.Control 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}placeholder="Enter Author Email" />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleEmail}>
                          Submit
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Col className="my-3 p-3" sm={12} md={6} lg={4}>   
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>Find Total Data</Card.Title>
                        <Form>
                            <Button variant="primary" onClick={() => {setURL('https://csv-data-formatter.herokuapp.com/api/totalData')}}>Total Data</Button>{' '}
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>  
                </Row>
              </Col>         
            </Row>

            {/* Table */}
            {totalData.length > 0 
              ? <TableData className='table' tableData={totalData}/>
              : <></>
            }
            
          </Container>
        </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
