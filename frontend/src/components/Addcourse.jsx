import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Addcourse.css';

const Addcourse = () => { 
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    courseCategory: "",
    courseImage: ""
  });

  const location = useLocation();

  function fieldValue(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  }

  function valueAdd() {
    if (location.state != null) {
      axios.put('http://localhost:2999/editcourse/' + location.state.val._id, form)
        .then((res) => {
          alert('Course edited');
        }).catch((error) => {
          console.log(error);
        });
    } else {
      axios.post('http://localhost:2999/addcourse', form)
        .then((res) => {
          alert('Course added');
        }).catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (location.state != null) {
      setForm({
        courseName: location.state.val.courseName,
        courseDescription: location.state.val.courseDescription,
        courseCategory: location.state.val.courseCategory,
        courseImage: location.state.val.courseImage
      });
    } else {
      setForm({
        courseName: "",
        courseDescription: "",
        courseCategory: "",
        courseImage: ""
      });
    }
  }, [location.state]);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        required
        id="a"
        label="Course Name" 
        name='courseName' 
        onChange={fieldValue} 
        value={form.courseName}
      /><br />

      <TextField
        required
        id="b" 
        label="Course Description" 
        name='courseDescription' 
        onChange={fieldValue}
        value={form.courseDescription}
      /><br />

      <TextField
        required
        id="c"
        label="Course Category"
        name='courseCategory'
        onChange={fieldValue}
        value={form.courseCategory}
      /><br />
 
      <TextField 
        required
        id="x"
        label="Course Img url"
        name='courseImage'
        onChange={fieldValue}
        value={form.courseImage}
      /><br />

      <Button 
        className='button3'
        variant='contained' 
        onClick={valueAdd}
      >
        Add
      </Button>
    </Box>
  );
}

export default Addcourse;
