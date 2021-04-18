import React from 'react'
import Converser from '../components/converser/Converser';
import InfluencerCard from '../components/socialmedia/InfluencerCard';
import PageHeader from '../components/PageHeader';
import TopBar from '../components/TopBar'

export default function SocialMediaPage() {
  return (
        <>
            <PageHeader name="Social Media Page"></PageHeader>
            <InfluencerCard influencer={{
                title: "Documenting Bitcoin",
                avgRank: 59,
                engRank:3,
                followerRank: 109,
                postRank:63,
                rank:1
            }}>
                
            </InfluencerCard>
        </>
    )
}
