import React, { Component } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

export default class Dashboard extends Component {
  state = {
    movies: []
  };

  componentDidMount = () => {
    axios
      .get("https://fake-movie-database-api.herokuapp.com/api?s=star%20wars")
      .then((res) => {
        this.setState({
          movies: res.data.Search
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const moviesData = this.state.movies.map((m) => {
      return (
        <Col key={m.imdbID}>
          <Card style={{ width: "18rem" }} key={m.imdbID}>
            <Card.Img
              variant="top"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/b38fa6a8-cf50-49e4-a3f0-60ef5f997d2e.jpeg";
              }}
              src={m.Poster}
            />
            <Card.Body>
              <Card.Title>{m.Title}</Card.Title>
              <Card.Text>{m.Year}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return (
      <>
        <Container className="mt-3 mb-5">
          <Row xs={1} md={3} className="g-4">
            {this.state.movies.length > 0 ? (
              moviesData
            ) : (
              <Spinner animation="border" role="status"></Spinner>
            )}
          </Row>
        </Container>
      </>
    );
  }
}
