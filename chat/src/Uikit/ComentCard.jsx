import React from 'react'
import Card from '@material-ui/core/Card';
import { Avatar } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MiniSpecer } from '.';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
}))

const ComentCard = (props) =>{
    const classes = useStyles();
    const image = props.image
 
    return (
        <>
            <MiniSpecer/>
            <Card >
            <CardHeader
                    avatar={
                    <Avatar  src={props.avater}/>
                    }
                
                    title={props.userName}
                />
                {
                 image ? (
                     <CardMedia
                         className={classes.media}
                         image={props.image}
                     />
                 ):(
                     <></>
                 )
                    
                }

                <CardContent>
                    <Typography> 
                        {props.coment}
                    </Typography>
                </CardContent>

            </Card>
        </>
    )
}

export default ComentCard