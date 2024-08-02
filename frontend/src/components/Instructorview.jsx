import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Instructorview.css';

const Instructorview = () => {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:2999/details')
            .then((res) => {
                setRows(res.data);
            })
            .catch((error) => {
                console.log('error:', error);
            });
    }, []);

    function del_Value(id) {
        axios.delete('http://localhost:2999/deletecourse/' + id)
            .then(() => {
                alert('Data deleted');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function update_Value(val) {
        navigate('/iaddcourse', { state: { val } });
    }

    function add_Value() {
        navigate('/iaddcourse');
    }

    return (
        <div className="instructor-view-container">
            <Grid container spacing={2}>
                {rows.map((row, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ minWidth: 275 }} className='cards1'>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {row.courseName}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {row.courseDescription}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {row.courseCategory}
                                </Typography>
                                <img src={row.courseImage} alt={row.courseName} style={{ width: '100%', height: 'auto' }} />
                            </CardContent>
                            <CardActions>
                                <Button className='button1' variant='contained' onClick={() => update_Value(row)}>Update</Button>
                                <Button className='button2' variant='contained' onClick={() => del_Value(row._id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button 
                className="add-button"
                variant='contained'
                onClick={add_Value}
            >
               +
            </Button>
        </div>
    );
};

export default Instructorview;
