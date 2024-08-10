import React, { useEffect, useState } from 'react';
import { Container, Typography, Button,Card,CardContent } from '@mui/material';
import { Box } from '@mui/system';
import Slider from 'react-slick';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css'; // Import the CSS file

const Home = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get('http://localhost:2999/details')
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleLoginClick = () => {
    navigate('/loginpage'); // Navigate to the LoginPage
  };

  const handleSignUpClick = () => {
    navigate('/signuppage'); // Navigate to the SignupPage
  };

  return (
    <Container className="homepage-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Box className="button-container">
            <Button variant="contained" color="primary" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="contained" color="primary" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="div" sx={{ mb: 2, textAlign: 'center' }} color={'black'}>
          Available Courses
        </Typography>
        <Slider {...settings}>
          {courses.map((course, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Card className="course-card">
                <CardContent>
                  <Typography variant="h6" component="div">
                    {course.courseName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.courseDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.courseCategory}
                  </Typography>
                  <img src={course.courseImage} alt={course.courseName} style={{ width: '100%', height: 'auto' }} />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default Home;
