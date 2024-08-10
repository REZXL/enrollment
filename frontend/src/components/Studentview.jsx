import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Studentview.css';

const Studentview = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:2999/details')
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleEnroll = async (courseId) => {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    if (!userId) {
      alert('User not logged in');
      return;
    }

    try {
      await axios.post('http://localhost:2999/enrollcourse', { courseId, userId });
      navigate('/enrollview'); // Redirect to Enrollview after successful enrollment
    } catch (error) {
      alert('Error enrolling in course');
    }
  };

  return (
    <div className="student-view-wrapper">
      <Typography variant="h4" component="div" sx={{ mb: 4, textAlign: 'center' }} color={'black'}>
        Available Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="course-card">
              <CardContent className="card-content">
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
                <div className="card-footer">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ mt: 2 }} 
                    onClick={() => handleEnroll(course._id)}
                  >
                    Enroll
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Studentview;
