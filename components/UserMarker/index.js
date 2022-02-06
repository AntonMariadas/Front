import dynamic from 'next/dynamic';

const UserMarker = dynamic(() => import('./UserMarker'), {
    ssr: false
});

export default UserMarker;