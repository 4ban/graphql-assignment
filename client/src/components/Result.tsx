import React, { useEffect } from 'react';
import { gql, useQuery } from "@apollo/client";
import { useAtom } from 'jotai'
import { historyAtom, HistoryItemType } from '../store';


import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

// Since we are not using stateAbbreviation, latitude and longitude, we can remove these fields from the query, but for visibility I left them there
const GET_INFO = gql`
  query getInfo($country: String!, $postCode: String!) {
    info(country: $country, postCode: $postCode) {
      country
      postCode
      places {
        placeName
        state
        stateAbbreviation
        latitude
        longitude
      }
    }
  }
`;

type ResultProps = {
  country: string,
  postCode: string
}

type PlaceType = {
  placeName: string,
  state: string
}

export const Result = ({country, postCode}: ResultProps) => {
  const { loading, error, data } = useQuery(GET_INFO, { variables: { country, postCode: String(postCode) } });
  const [history, setHistory] = useAtom(historyAtom);

  // Saving history (city, state and zip) when we have this data
  useEffect(()=>{
    if (data && data.info) {
      // I bet there is a better way to manage history always have length of 5.
      setHistory(history.length < 5 ? [...history, { postCode: String(postCode), placeName: data?.info?.places[0]?.placeName, state:data?.info?.places[0]?.state, keyProp: String(new Date().getTime())}] : [...history.slice(1), { postCode: String(postCode), placeName: data?.info?.places[0]?.placeName, state:data?.info?.places[0]?.state, keyProp: String(new Date().getTime())} ])
    }
  }, [data])

  if (loading) return <CircularProgress />
  if (error) return <>Please enter the valid ZIP!</>
  return (
    <Paper elevation={3} sx={{paddingRight: 1, paddingLeft:1, paddingTop: 2, paddingBottom:2, backgroundColor: '#a6baca', width:'100%'}}>
      {data?.info?.places.map((place:PlaceType) => {
        return <div key={`${place.placeName}-${new Date().getTime()}`}>{place.placeName} - {place.state}</div>
      })}
    </Paper>
  )
}