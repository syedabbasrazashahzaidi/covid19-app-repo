import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './InfoBox.css'



export default function InfoBox({title, cases, total}) {

 

  return (
    <Card className="app__infobox" variant="outlined">
      <CardContent>
        <Typography className="app__title" color="textSecondary">
          {title}
        </Typography>
      
        <Typography className="app__cases" color="textSecondary">
           Today: {cases}
        </Typography>

        <Typography className="app__total" color="textSecondary">
          Total:  {total}
        </Typography>
      </CardContent>
    </Card>

    
  );
}