import React from 'react'
import { useParams } from 'react-router';
import PageHeader from '../components/PageHeader';
import TopBar from '../components/TopBar'
import CoinInfo from '../components/CoinInfo'
import CoinValue from '../components/CoinValue'
import CoinStats from '../components/CoinStats'
import CardCoinInfo from '../components/cardCoinInfo';
import CoinChart from '../components/coinChart'
//@core-material-ui
import {makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles({
    
});


export default function CoinPage() {
    let {coinName} = useParams()
    const classes = useStyles();

  return (
    <div style={{ width: '100%', height:'auto'}}>

        <Box 
            sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"title title title title title"
                "description description description details details"
                "description description description details details"
                "description description description . ."
                "cards1 cards2 cards3 table table"
                "cards1 cards2 cards3 table table"
                "chart chart chart table table"
                "chart chart chart table table"
                "chart chart chart table table"`,

            }}
        >
            <Box sx={{ gridArea: 'title' }}>
                <PageHeader name={`Coins/${coinName}`}></PageHeader>
            </Box>
            <Box border={1}  sx={{ gridArea: 'description',  gridColumn: '1/3', gridRow: '2'  }}>
                <CoinInfo></CoinInfo>
            </Box>
            <Box border={1}   sx={{ gridArea: 'details',   gridColumn: '3/5', gridRow: '2'  }}>
                <CoinValue></CoinValue>
            </Box>
            <Box border={1}  sx={{ gridArea: 'table' }}>
                <CoinStats ></CoinStats>
            </Box>
            <Box border={1}  sx={{ gridArea: 'cards1' }}>
                <CardCoinInfo></CardCoinInfo>
            </Box>
            <Box  sx={{ gridArea: 'cards2' }}>
                <CardCoinInfo></CardCoinInfo>
            </Box>
            <Box  sx={{ gridArea: 'cards3' }}>
                <CardCoinInfo></CardCoinInfo>
            </Box>
            <Box border={1}  sx={{ gridArea: 'chart' }}>
                <CoinChart></CoinChart>
            </Box> 
        </Box>
    </div>
    )
}
