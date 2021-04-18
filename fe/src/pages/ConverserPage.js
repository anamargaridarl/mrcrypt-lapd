import React from 'react'
import Converser from '../components/converser/Converser';
import PageHeader from '../components/PageHeader';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

export default function ConverserPage() {
  return (
        <>
            <TopBar/>
            <PageHeader name="Converser"></PageHeader>
            <Converser></Converser>
            <Footer/>
        </>
    )
}
