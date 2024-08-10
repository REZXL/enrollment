import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import './Enrollview.css';

const Enrollview = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  useEffect(() => {
    if (!userId) {
      alert('User not logged in');
      return;
    }

    axios.get(`http://localhost:2999/enrolledcourses/${userId}`)
      .then((res) => {
        setEnrolledCourses(res.data);
      })
      .catch((error) => {
        console.error('Error fetching enrolled courses:', error);
      });
  }, [userId]);

  return (
    <div className="enroll-view-wrapper">
      <Container className="enroll-view-container">
        <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center' }}>
          Enrolled Courses
        </Typography>
        <Grid container spacing={2}>
          {enrolledCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  <img src={course.courseImage} alt={course.courseName} className="course-image" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Enrollview;
