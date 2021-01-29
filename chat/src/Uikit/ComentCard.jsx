import React from 'react'
import Card from '@material-ui/core/Card';
import { Avatar, IconButton } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { MiniSpecer } from '.';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles((theme) => ({
    
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

    cardFlex: {
        display:'flex',
        justifyContent: 'spacebetween',
        alignItems:'center'

    }

}))

const ComentCard = (props) =>{
    const classes = useStyles();
    const image = props.image
    const id = props.id
 
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

                <CardContent className={classes.cardFlex}>
                    <Typography> 
                        {props.coment}
                    </Typography>
                    <IconButton aria-label="add to favorites" onClick={()=>props.likeButtonClick(id)}>
                        <FavoriteIcon color=   {props.favoritCount ? 'secondary':  'disabled'}   />
                        <p>{props.favoritCount}</p>
                    </IconButton>
                </CardContent>

            </Card>
        </>
    )
}

export default ComentCard