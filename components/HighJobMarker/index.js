import dynamic from 'next/dynamic';

const HighJobMarker = dynamic(() => import('./HighJobMarker'), {
    ssr: false
});

export default HighJobMarker;