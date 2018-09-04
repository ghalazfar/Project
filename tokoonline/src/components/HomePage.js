import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_1 } from '../supports/api-url/apiurl.js'
import { Carousel } from 'react-bootstrap';
import carouselimg from '../supports/img/carousel.jpg';

class HomePage extends Component {
        render() {
        return (
            <div className="container-fluid">
            <Carousel interval="3500" controls={false} >
                <Carousel.Item>
                    <img src={carouselimg} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={carouselimg} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={carouselimg} />
                </Carousel.Item>
            </Carousel>
            </div>
        )
    }
}

export default HomePage