'use client'

import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react'
import { DefaultVideoLayout, defaultLayoutIcons } from '@vidstack/react/player/layouts/default'

export default function VideoPlay() {
    return (
        <div className='w-full'>
            <MediaPlayer
                src={{
                    src: 'https://tiktok-clone-taplamit.s3.ap-southeast-2.amazonaws.com/videos-hls/FF2_a_vyVj68aOyI4V1nZ/master.m3u8',
                    type: 'application/x-mpegurl'
                }}
                viewType='video'
                streamType='on-demand'
                logLevel='warn'
                crossOrigin
                playsInline
                title='Video Demo'
                poster='/images/home/inception-vertical.jpg'
                className='w-full h-full bg-black rounded-2xl shadow-lg overflow-hidden relative'
            >
                <MediaProvider className='w-full h-full'>
                    <Poster className='vds-poster object-contain w-full h-full' />
                    <Track src='/subtitles/vi.vtt' kind='subtitles' label='Tiếng Việt' default />
                </MediaProvider>

                <DefaultVideoLayout
                    thumbnails='https://files.vidstack.io/sprite-fight/thumbnails.vtt'
                    icons={defaultLayoutIcons}
                />
            </MediaPlayer>

            <style jsx global>{`
                media-player video,
                media-player .vds-poster img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                }
            `}</style>
        </div>
    )
}
