import React from 'react'
import Card from '@material-ui/core/Card';
import { Avatar } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
const ComentCard = (props) =>{
    return (
        <Card>
           <CardHeader
                avatar={
                <Avatar aria-label="recipe" >
                    {props.avater}
                </Avatar>
                }
               
                title={props.userName}
             />
             <CardMedia
                image={props.image}
             />

             <CardContent>
                 <Typography> 
                     {props.coment}
                 </Typography>
             </CardContent>

        </Card>
    )
}

export default ComentCard