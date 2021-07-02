import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { PlayCircleOutline } from '@material-ui/icons';
import { SkipPrevious } from '@material-ui/icons';
import { SkipNext } from '@material-ui/icons';
import { Shuffle } from '@material-ui/icons';
import { Repeat } from '@material-ui/icons';
import { VolumeDown } from '@material-ui/icons';
import { PauseCircleOutline } from '@material-ui/icons';
import { PlaylistPlay } from '@material-ui/icons';
import { Grid, Slider } from "@material-ui/core";
import "./Footer.css";

function Footer({ spotify }) {
    const[{ token, item, playing}, dispatch] = useStateValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
            console.log(r);
            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    }, [spotify]);

    const handlePlayPause = () => {
        if(playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    };

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    };

    const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack.then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    return (
        <div className="footer">
            <div className="footer__left">
                <img 
                className="footer_albumLogo"
                src={item?.album.images[0].url}
                alt={item?.name}
                />

                {item ? (
                    <div className="footer__songInfo">
                        <h4>{item.name}</h4>
                        <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>

            <div className="footer__center">
                <Shuffle className="footer_green" />
                <SkipPrevious onClick={skipNext} className="footer__icon" />
                {playing ? (
                    <PauseCircleOutline 
                    onClick={handlePlayPause}
                    fontSize="large"
                    className="footer_icon"
                    />
                ) : (
                    <PlayCircleOutline 
                    onClick={handlePlayPause}
                    fontSize="large"
                    className="footer__icon"
                    />
                )}

                <SkipNext onClick={skipPrevious} className="footer__icon" />
                <Repeat className="footer__green" />
            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay />
                    </Grid>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider" />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Footer;
