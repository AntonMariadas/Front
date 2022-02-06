import dynamic from 'next/dynamic';

const JobMarker = dynamic(() => import('./JobMarker'), {
    ssr: false
});

export default JobMarker;