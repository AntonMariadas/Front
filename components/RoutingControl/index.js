import dynamic from 'next/dynamic';

const RoutingControl = dynamic(() => import('./RoutingControl'), {
    ssr: false
});

export default RoutingControl;