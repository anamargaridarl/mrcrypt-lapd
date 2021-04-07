import React from 'react'
import Converser from '../components/Converser';
import PageHeader from '../components/PageHeader';
import TopBar from '../components/TopBar'

export default function ConverserPage() {
  return (
        <>
            <TopBar></TopBar>
            <PageHeader name="Converser"></PageHeader>
            <Converser></Converser>
        </>
    )
}
