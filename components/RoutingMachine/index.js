import dynamic from 'next/dynamic';

const RoutingMachine = dynamic(() => import('./RoutingMachine'), {
    ssr: false
});

export default RoutingMachine;