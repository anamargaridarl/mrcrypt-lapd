import React from 'react';
import {Box, Grid, makeStyles, Paper, Typography} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((_) =>({

}));


export default function InfluencerCard({influencer}){
  const classes = useStyles();

  return (
    <Box boxShadow={3} style={{minWidth: "150px", maxWidth: "330px", height:"auto"}} >
          <Box py = {1} borderBottom={1} display = "flex" alignItems ="center">
              <Box style={{backgroundColor: '#673081'}}
                color="#fff"
                borderRadius="50%" 
                mx={2}
                p={1}  
            >
                #{influencer.rank}
              </Box>
              {influencer.title}
          </Box>
        <Box 
            color="gray"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center" 
            display= "flex" 
            >
            <Box display= "flex"             
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center" borderRight={1}
            width="100%"
            height="100%"
            p={2}
            >
                <Box mb= {2}>
                    <Typography fontWeight="bold" align="center">
                    Weighted avg rank
                    </Typography>
                </Box>
                <Box fontWeight={600}>
                {influencer.avgRank}
                </Box>
            </Box>
            <Box 
              p= {1}
              width="100%" 
              height="100%" 
               >
                <Box display = "flex" fontSize={13} my={1}>
                    <Box mr={1} fontWeight={600}>{influencer.engRank}</Box>
                    Engagement rank
                </Box>
                <Box display = "flex" fontSize={13} my={1}>
                    <Box mr={1} fontWeight={600}> {influencer.followerRank}</Box>
                    Follower rank
                </Box>
                <Box display = "flex" fontSize={13} my={1}>
                    <Box mr={1} fontWeight={600}> {influencer.postRank}</Box>
                    Post rank
                </Box>
            </Box>
            
        </Box>
    </Box>

  );
}